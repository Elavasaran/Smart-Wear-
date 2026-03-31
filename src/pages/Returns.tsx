import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RotateCcw, CheckCircle, XCircle, Clock } from 'lucide-react';

const Returns = () => {
  const returnSteps = [
    { step: "1", title: "Initiate Return", description: "Log in to your account and select the item to return" },
    { step: "2", title: "Pack the Item", description: "Pack the item in its original packaging with all tags intact" },
    { step: "3", title: "Schedule Pickup", description: "Choose a convenient date for our pickup partner" },
    { step: "4", title: "Get Refund", description: "Refund will be processed within 5-7 business days" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <RotateCcw className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Returns & Refunds
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Easy 15-day returns. No questions asked.
            </p>
          </div>
        </section>

        {/* Return Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">How to Return</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {returnSteps.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-accent text-primary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Policy Details */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-8">Return Policy</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card border border-border rounded-xl p-6">
                  <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
                  <h3 className="font-semibold text-lg mb-3">Eligible for Return</h3>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• Items within 15 days of delivery</li>
                    <li>• Unused items with original tags</li>
                    <li>• Items in original packaging</li>
                    <li>• Defective or damaged items</li>
                  </ul>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6">
                  <XCircle className="w-8 h-8 text-red-500 mb-4" />
                  <h3 className="font-semibold text-lg mb-3">Not Eligible</h3>
                  <ul className="text-muted-foreground text-sm space-y-2">
                    <li>• Items beyond 15 days of delivery</li>
                    <li>• Used or altered items</li>
                    <li>• Items without original tags</li>
                    <li>• Innerwear and accessories</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <Clock className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-lg mb-3">Refund Timeline</h3>
                <p className="text-muted-foreground">
                  Once we receive your return, refunds are processed within 5-7 business days. 
                  The amount will be credited to your original payment method. 
                  For COD orders, refunds are processed via bank transfer.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
