import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  ChevronRight, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  Download,
  Eye,
  ShoppingBag
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  price: number;
  quantity: number;
  size: string | null;
  color: string | null;
}

interface Order {
  id: string;
  order_number: string;
  status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total: number;
  shipping_address: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  } | null;
  payment_method: string | null;
  payment_status: string | null;
  tracking_number: string | null;
  created_at: string;
  items?: OrderItem[];
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-blue-500/20 text-blue-400', icon: CheckCircle },
  packed: { label: 'Packed', color: 'bg-purple-500/20 text-purple-400', icon: Package },
  shipped: { label: 'Shipped', color: 'bg-orange-500/20 text-orange-400', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-500/20 text-red-400', icon: XCircle },
};

const statusSteps = ['confirmed', 'packed', 'shipped', 'delivered'];

const Orders = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Transform data to match Order type
      const transformedOrders = data.map(order => ({
        ...order,
        shipping_address: order.shipping_address as Order['shipping_address'],
      })) as Order[];
      setOrders(transformedOrders);
    }
    setLoading(false);
  };

  const fetchOrderItems = async (orderId: string) => {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);

    if (!error && data) {
      setOrderItems(data as OrderItem[]);
    }
  };

  const viewOrderDetails = async (order: Order) => {
    setSelectedOrder(order);
    await fetchOrderItems(order.id);
  };

  const generateInvoice = (order: Order) => {
    // Create invoice HTML
    const invoiceContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${order.order_number}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .logo { font-size: 24px; font-weight: bold; color: #d4af37; }
          .invoice-title { font-size: 32px; color: #1a1a1a; }
          .details { margin-bottom: 30px; }
          .details p { margin: 5px 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #1a1a1a; color: white; }
          .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
          .footer { margin-top: 40px; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">E Smart Men Wear</div>
          <div class="invoice-title">INVOICE</div>
        </div>
        <div class="details">
          <p><strong>Order Number:</strong> ${order.order_number}</p>
          <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
          <p><strong>Status:</strong> ${statusConfig[order.status].label}</p>
        </div>
        ${order.shipping_address ? `
        <div class="details">
          <p><strong>Shipping Address:</strong></p>
          <p>${order.shipping_address.name}</p>
          <p>${order.shipping_address.address}</p>
          <p>${order.shipping_address.city}, ${order.shipping_address.state} - ${order.shipping_address.pincode}</p>
          <p>Phone: ${order.shipping_address.phone}</p>
        </div>
        ` : ''}
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Size</th>
              <th>Color</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderItems.map(item => `
              <tr>
                <td>${item.product_name}</td>
                <td>${item.size || '-'}</td>
                <td>${item.color || '-'}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${item.price * item.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total">
          <p>Subtotal: ₹${order.subtotal}</p>
          <p>Shipping: ₹${order.shipping_cost}</p>
          ${order.discount > 0 ? `<p>Discount: -₹${order.discount}</p>` : ''}
          <p style="font-size: 22px;">Total: ₹${order.total}</p>
        </div>
        <div class="footer">
          <p>Thank you for shopping with E Smart Men Wear!</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([invoiceContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice-${order.order_number}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusProgress = (status: string) => {
    if (status === 'pending' || status === 'cancelled') return 0;
    const index = statusSteps.indexOf(status);
    return ((index + 1) / statusSteps.length) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-heading font-bold">My Orders</h1>
            <Link to="/shop">
              <Button variant="outline" className="gap-2">
                <ShoppingBag className="w-4 h-4" /> Continue Shopping
              </Button>
            </Link>
          </div>

          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Link to="/shop">
                <Button className="bg-accent hover:bg-accent/90">Start Shopping</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-secondary border-border hover:border-accent/30 transition-colors">
                      <CardContent className="p-5">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium text-lg">{order.order_number}</h3>
                              <Badge className={statusConfig[order.status].color}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig[order.status].label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </p>
                            {order.tracking_number && (
                              <p className="text-sm text-accent mt-1">
                                Tracking: {order.tracking_number}
                              </p>
                            )}
                          </div>

                          <div className="text-right">
                            <p className="text-2xl font-bold text-accent">₹{order.total}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.payment_method || 'N/A'}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar for Active Orders */}
                        {order.status !== 'cancelled' && order.status !== 'pending' && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                              {statusSteps.map((step) => (
                                <span
                                  key={step}
                                  className={statusSteps.indexOf(step) <= statusSteps.indexOf(order.status) ? 'text-accent' : ''}
                                >
                                  {step.charAt(0).toUpperCase() + step.slice(1)}
                                </span>
                              ))}
                            </div>
                            <div className="h-2 bg-background rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${getStatusProgress(order.status)}%` }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="h-full bg-accent rounded-full"
                              />
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewOrderDetails(order)}
                            className="gap-1"
                          >
                            <Eye className="w-4 h-4" /> View Details
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              await fetchOrderItems(order.id);
                              generateInvoice(order);
                            }}
                            className="gap-1"
                          >
                            <Download className="w-4 h-4" /> Invoice
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              Order {selectedOrder?.order_number}
              {selectedOrder && (
                <Badge className={statusConfig[selectedOrder.status].color}>
                  {statusConfig[selectedOrder.status].label}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Items */}
              <div>
                <h4 className="font-medium mb-3">Items</h4>
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-3 bg-secondary rounded-lg"
                    >
                      {item.product_image && (
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{item.product_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.color && ' • '}
                          {item.color && `Color: ${item.color}`}
                        </p>
                        <p className="text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-accent">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              {selectedOrder.shipping_address && (
                <div>
                  <h4 className="font-medium mb-3">Shipping Address</h4>
                  <div className="p-3 bg-secondary rounded-lg text-sm">
                    <p className="font-medium">{selectedOrder.shipping_address.name}</p>
                    <p>{selectedOrder.shipping_address.address}</p>
                    <p>
                      {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state} -{' '}
                      {selectedOrder.shipping_address.pincode}
                    </p>
                    <p>Phone: {selectedOrder.shipping_address.phone}</p>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div>
                <h4 className="font-medium mb-3">Order Summary</h4>
                <div className="p-3 bg-secondary rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{selectedOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₹{selectedOrder.shipping_cost}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount</span>
                      <span>-₹{selectedOrder.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-accent">₹{selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Tracking Info */}
              {selectedOrder.tracking_number && (
                <div>
                  <h4 className="font-medium mb-3">Tracking Information</h4>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <p className="text-accent font-medium">{selectedOrder.tracking_number}</p>
                  </div>
                </div>
              )}

              <Button
                onClick={() => {
                  generateInvoice(selectedOrder);
                }}
                className="w-full bg-accent hover:bg-accent/90 gap-2"
              >
                <Download className="w-4 h-4" /> Download Invoice
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Orders;
