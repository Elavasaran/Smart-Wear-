import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, Clock, MapPin, Package } from 'lucide-react';

const Shipping = () => {
  const shippingOptions = [
    {
      icon: Truck,
      title: "Standard Delivery",
      time: "5-7 Business Days",
      price: "₹99 (Free above ₹999)"
    },
    {
      icon: Clock,
      title: "Express Delivery",
      time: "2-3 Business Days",
      price: "₹199"
    },
    {
      icon: Package,
      title: "Same Day Delivery",
      time: "Within 24 Hours",
      price: "₹299 (Select cities only)"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <Truck className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Shipping Information
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Fast, reliable delivery across India. Choose the option that works best for you.
            </p>
          </div>
        </section>

        {/* Shipping Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {shippingOptions.map((option, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <option.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-xl mb-2">{option.title}</h3>
                  <p className="text-accent font-medium mb-1">{option.time}</p>
                  <p className="text-muted-foreground text-sm">{option.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping Policy */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-8">Shipping Policy</h2>
              
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Delivery Areas</h3>
                  <p>We deliver to all pin codes across India. Remote areas may take an additional 2-3 days.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Order Processing</h3>
                  <p>Orders are processed within 24 hours of placement. Orders placed after 5 PM IST will be processed the next business day.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">Tracking Your Order</h3>
                  <p>Once shipped, you'll receive a tracking number via email and SMS. You can track your order on our Track Order page.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">International Shipping</h3>
                  <p>Currently, we only ship within India. International shipping will be available soon.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;
