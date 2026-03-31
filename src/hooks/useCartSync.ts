import { useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useCartStore, CartItem, Product } from '@/store/cartStore';
import { toast } from 'sonner';

export const useCartSync = () => {
  const { user, loading: authLoading } = useAuth();
  const { items, addToCart, clearCart } = useCartStore();
  const isInitialSyncDone = useRef(false);
  const isSyncing = useRef(false);

  // Load cart from database on login
  const loadCartFromDB = useCallback(async () => {
    if (!user || isSyncing.current) return;
    
    isSyncing.current = true;
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading cart:', error);
        return;
      }

      if (data && data.length > 0) {
        // Merge with existing local cart
        const localItems = useCartStore.getState().items;
        
        // Clear and rebuild cart
        clearCart();
        
        // Add DB items first
        for (const item of data) {
          const product: Product = {
            id: item.product_id,
            name: item.product_name,
            price: Number(item.price),
            originalPrice: item.original_price ? Number(item.original_price) : undefined,
            image: item.product_image || '',
            category: '',
            sizes: [],
            colors: [],
            rating: 0,
            reviews: 0,
            description: '',
            inStock: true
          };
          
          // Use internal add to avoid triggering sync
          useCartStore.setState((state) => {
            const existingItem = state.items.find(
              (i) => i.id === product.id && i.selectedSize === item.selected_size && i.selectedColor === item.selected_color
            );
            if (existingItem) {
              return {
                items: state.items.map((i) =>
                  i.id === product.id && i.selectedSize === item.selected_size && i.selectedColor === item.selected_color
                    ? { ...i, quantity: item.quantity }
                    : i
                ),
              };
            }
            return {
              items: [...state.items, { 
                ...product, 
                quantity: item.quantity, 
                selectedSize: item.selected_size, 
                selectedColor: item.selected_color 
              }],
            };
          });
        }

        // Merge any local items not in DB
        for (const localItem of localItems) {
          const existsInDB = data.some(
            (dbItem) => 
              dbItem.product_id === localItem.id && 
              dbItem.selected_size === localItem.selectedSize && 
              dbItem.selected_color === localItem.selectedColor
          );
          if (!existsInDB) {
            addToCart(localItem, localItem.selectedSize, localItem.selectedColor);
          }
        }
      }
    } finally {
      isSyncing.current = false;
      isInitialSyncDone.current = true;
    }
  }, [user, clearCart, addToCart]);

  // Sync cart to database
  const syncCartToDB = useCallback(async (cartItems: CartItem[]) => {
    if (!user || !isInitialSyncDone.current || isSyncing.current) return;

    isSyncing.current = true;
    try {
      // Delete all existing cart items for user
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      // Insert current cart items
      if (cartItems.length > 0) {
        const itemsToInsert = cartItems.map((item) => ({
          user_id: user.id,
          product_id: item.id,
          product_name: item.name,
          product_image: item.image,
          price: item.price,
          original_price: item.originalPrice,
          quantity: item.quantity,
          selected_size: item.selectedSize,
          selected_color: item.selectedColor
        }));

        const { error } = await supabase
          .from('cart_items')
          .insert(itemsToInsert);

        if (error) {
          console.error('Error syncing cart:', error);
        }
      }
    } finally {
      isSyncing.current = false;
    }
  }, [user]);

  // Load cart on login
  useEffect(() => {
    if (!authLoading && user && !isInitialSyncDone.current) {
      loadCartFromDB();
    }
  }, [user, authLoading, loadCartFromDB]);

  // Reset sync state on logout
  useEffect(() => {
    if (!user) {
      isInitialSyncDone.current = false;
    }
  }, [user]);

  // Sync to DB on cart changes (debounced)
  useEffect(() => {
    if (!user || !isInitialSyncDone.current) return;

    const timeoutId = setTimeout(() => {
      syncCartToDB(items);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [items, user, syncCartToDB]);

  return { loadCartFromDB, syncCartToDB };
};
