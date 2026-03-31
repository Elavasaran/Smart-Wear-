import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <Shield className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Your privacy is important to us. Here's how we protect your data.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    When you use E-GentleFit, we collect information you provide directly, such as your name, 
                    email address, phone number, shipping address, and payment information when you make a purchase. 
                    We also collect usage data like your browsing history on our site and device information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">How We Use Your Information</h2>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Process and fulfill your orders</li>
                    <li>• Send order confirmations and shipping updates</li>
                    <li>• Provide customer support</li>
                    <li>• Send promotional emails (with your consent)</li>
                    <li>• Improve our website and services</li>
                    <li>• Prevent fraud and enhance security</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement industry-standard security measures to protect your personal information. 
                    All payment transactions are encrypted using SSL technology. We never store your complete 
                    credit card information on our servers.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies to enhance your browsing experience, remember your preferences, and analyze 
                    site traffic. You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Third-Party Sharing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell your personal information. We may share data with trusted partners who assist 
                    us in operating our website, conducting our business, or servicing you (e.g., shipping partners, 
                    payment processors). These partners are bound by confidentiality agreements.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You have the right to access, update, or delete your personal information. 
                    You can opt out of marketing communications at any time. Contact us at 
                    elavarasanc93@gmail.com for any privacy-related requests.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have questions about this Privacy Policy, please contact us at:<br />
                    Email: elavarasanc93@gmail.com<br />
                    Phone: +91 63694 92221<br />
                    Address: Tirupattur, Tamil Nadu, India
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

export default PrivacyPolicy;
