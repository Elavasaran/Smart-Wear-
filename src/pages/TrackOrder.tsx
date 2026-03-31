import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package, Search, Truck, CheckCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setIsTracking(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <Package className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Track Your Order
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Enter your order number to see real-time updates on your delivery.
            </p>
          </div>
        </section>

        {/* Track Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <form onSubmit={handleTrack} className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter your order number (e.g., EG123456)"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-accent text-primary hover:bg-accent/90">
                  <Search className="w-4 h-4 mr-2" />
                  Track
                </Button>
              </form>

              {isTracking && (
                <div className="mt-12">
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Order Number</p>
                        <p className="font-semibold text-lg">{orderNumber.toUpperCase()}</p>
                      </div>
                      <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                        In Transit
                      </span>
                    </div>

                    <div className="space-y-6">
                      {[
                        { icon: CheckCircle, title: "Order Confirmed", time: "Jan 10, 2024 - 10:30 AM", done: true },
                        { icon: Package, title: "Packed & Ready", time: "Jan 10, 2024 - 2:00 PM", done: true },
                        { icon: Truck, title: "In Transit", time: "Jan 11, 2024 - 9:00 AM", done: true },
                        { icon: MapPin, title: "Out for Delivery", time: "Expected Today", done: false },
                      ].map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.done ? 'bg-accent text-primary' : 'bg-muted text-muted-foreground'}`}>
                            <step.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className={`font-medium ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {step.title}
                            </p>
                            <p className="text-sm text-muted-foreground">{step.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Need Help with Your Order?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contact our support team at elavarasanc93@gmail.com or call +91 63694 92221
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TrackOrder;
