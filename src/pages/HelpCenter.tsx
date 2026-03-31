import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HelpCircle, MessageCircle, Mail, Phone } from 'lucide-react';

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by visiting the 'Track Order' page and entering your order number. You'll receive tracking updates via email as well."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and cash on delivery for orders within India."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 5-7 business days. Express delivery is available for 2-3 business days at an additional cost."
    },
    {
      question: "Can I modify my order after placing it?",
      answer: "You can modify your order within 2 hours of placing it. After that, please contact our support team for assistance."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <HelpCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Help Center
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our support team.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Still Need Help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <MessageCircle className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
                <p className="text-muted-foreground text-sm">Available 9 AM - 9 PM IST</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-muted-foreground text-sm">elavarasanc93@gmail.com</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Phone className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <p className="text-muted-foreground text-sm">+91 63694 92221</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;
