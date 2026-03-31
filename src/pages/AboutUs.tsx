import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Target, Award, Heart } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: Target,
      title: "Quality First",
      description: "We source only the finest fabrics and materials for our products."
    },
    {
      icon: Award,
      title: "Premium Design",
      description: "Every piece is designed with attention to detail and modern aesthetics."
    },
    {
      icon: Heart,
      title: "Customer Love",
      description: "Your satisfaction is our priority. We're here to help you look your best."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a community of stylish, confident men across India."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              About <span className="text-gradient-gold">E-GentleFit</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Smart Men Wear – Your destination for premium men's fashion.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                E-GentleFit was born from a simple idea: every man deserves access to premium, 
                stylish clothing without breaking the bank. Founded in 2024 in Tirupattur, Tamil Nadu, 
                we set out to redefine men's fashion in India.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Today, we're proud to serve thousands of customers across India, offering a curated 
                collection of shirts, t-shirts, jeans, watches, and accessories. Our mission is to 
                help every man discover his unique style and dress with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <value.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">The EG Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Behind E-GentleFit is a passionate team of fashion enthusiasts, designers, and 
              customer service experts dedicated to bringing you the best shopping experience.
            </p>
            <div className="bg-card border border-border rounded-xl p-8 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold text-2xl">EG</span>
              </div>
              <p className="text-muted-foreground">
                Based in Tirupattur, Tamil Nadu, we're building the future of men's fashion in India.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
