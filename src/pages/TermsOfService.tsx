import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <FileText className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using E-GentleFit (egentlefit.com), you accept and agree to be bound by these 
                    Terms of Service. If you do not agree to these terms, please do not use our website.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Use of Website</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You agree to use this website only for lawful purposes and in a way that does not infringe 
                    upon the rights of others. You must not:
                  </p>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Use the site for any fraudulent purpose</li>
                    <li>• Attempt to gain unauthorized access to our systems</li>
                    <li>• Transmit malicious code or viruses</li>
                    <li>• Interfere with other users' enjoyment of the site</li>
                    <li>• Collect user information without consent</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Products and Pricing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All products are subject to availability. Prices are listed in Indian Rupees (₹) and may 
                    change without notice. We reserve the right to refuse or cancel any order for any reason, 
                    including errors in pricing or product information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Orders and Payment</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    When you place an order, you are making an offer to purchase. We may accept or decline this 
                    offer. Payment must be made at the time of order. We accept major credit cards, debit cards, 
                    UPI, net banking, and cash on delivery (for select areas).
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Shipping and Delivery</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Delivery times are estimates only and are not guaranteed. We are not liable for delays 
                    caused by shipping carriers or circumstances beyond our control. Risk of loss passes to 
                    you upon delivery.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Returns and Refunds</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Returns are accepted within 15 days of delivery, subject to our Return Policy. Items must 
                    be unused, in original packaging, and with all tags intact. Refunds are processed to the 
                    original payment method within 5-7 business days.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All content on this website, including text, images, logos, and design, is the property 
                    of E-GentleFit and is protected by copyright and trademark laws. You may not use, reproduce, 
                    or distribute any content without our written permission.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    E-GentleFit shall not be liable for any indirect, incidental, special, or consequential 
                    damages arising from your use of this website or products purchased. Our liability is 
                    limited to the amount paid for the product in question.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Governing Law</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These terms are governed by the laws of India. Any disputes shall be subject to the 
                    exclusive jurisdiction of courts in Tamil Nadu, India.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Contact</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these Terms of Service, contact us at:<br />
                    Email: elavarasanc93@gmail.com<br />
                    Phone: +91 63694 92221
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Last updated: January 2024
                  </p>
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

export default TermsOfService;
