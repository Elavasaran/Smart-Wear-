import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CartItem {
  product_id: string
  product_name: string
  product_image: string
  price: number
  quantity: number
  selected_size: string
  selected_color: string
}

interface ShippingAddress {
  fullName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const token = authHeader.replace('Bearer ', '')
    const { data: claimsData, error: claimsError } = await supabase.auth.getUser(token)
    
    if (claimsError || !claimsData?.user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const userId = claimsData.user.id

    const { items, shippingAddress, paymentMethod, promoCode } = await req.json() as {
      items: CartItem[]
      shippingAddress: ShippingAddress
      paymentMethod: string
      promoCode?: string
    }
    // NOTE: We intentionally do NOT accept 'discount' from the client.
    // The discount is always re-calculated server-side from the promo code.

    // Validate items
    if (!items || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Cart is empty' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone || 
        !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode) {
      return new Response(
        JSON.stringify({ error: 'Invalid shipping address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shippingCost = subtotal > 999 ? 0 : 99

    // Use service role for database operations
    const adminSupabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Re-validate promo code server-side (never trust client discount)
    let discountAmount = 0
    if (promoCode) {
      const { data: promo } = await adminSupabase
        .from('promo_codes')
        .select('*')
        .eq('code', promoCode.toUpperCase().trim())
        .eq('is_active', true)
        .maybeSingle()

      if (promo) {
        const notExpired = !promo.expiry_date || new Date(promo.expiry_date) >= new Date()
        const withinLimit = !promo.usage_limit || promo.usage_count < promo.usage_limit
        const meetsMinCart = subtotal >= promo.min_cart_value

        if (notExpired && withinLimit && meetsMinCart) {
          if (promo.discount_type === 'percentage') {
            discountAmount = (subtotal * promo.discount_value) / 100
            if (promo.max_discount && discountAmount > promo.max_discount) {
              discountAmount = promo.max_discount
            }
          } else {
            discountAmount = promo.discount_value
          }
          discountAmount = Math.min(discountAmount, subtotal)

          // Atomically increment usage count
          const { error: incrementError } = await adminSupabase
            .rpc('increment_promo_usage', { promo_code: promo.code })
          if (incrementError) {
            console.error('Failed to increment promo usage:', incrementError)
          }
        }
      }
    }

    const total = subtotal + shippingCost - discountAmount

    // Create order
    const { data: order, error: orderError } = await adminSupabase
      .from('orders')
      .insert({
        user_id: userId,
        subtotal,
        shipping_cost: shippingCost,
        discount: discountAmount,
        total,
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'cod' ? 'pending' : 'pending',
        status: 'pending',
        notes: promoCode ? `Promo code used: ${promoCode}` : null
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return new Response(
        JSON.stringify({ error: 'Failed to create order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_image: item.product_image,
      price: item.price,
      quantity: item.quantity,
      size: item.selected_size,
      color: item.selected_color
    }))

    const { error: itemsError } = await adminSupabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items error:', itemsError)
      // Rollback order if items fail
      await adminSupabase.from('orders').delete().eq('id', order.id)
      return new Response(
        JSON.stringify({ error: 'Failed to create order items' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Clear user's cart
    await adminSupabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id,
        orderNumber: order.order_number,
        total: order.total,
        paymentMethod
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Create order error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})