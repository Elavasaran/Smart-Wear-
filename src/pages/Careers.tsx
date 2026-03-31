import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Briefcase, MapPin, Clock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Careers = () => {
  const openPositions = [
    {
      title: "Fashion Designer",
      location: "Tirupattur, Tamil Nadu",
      type: "Full-time",
      description: "Create innovative designs for our men's fashion collection."
    },
    {
      title: "Digital Marketing Specialist",
      location: "Remote / Tirupattur",
      type: "Full-time",
      description: "Drive our online presence and marketing campaigns."
    },
    {
      title: "Customer Support Executive",
      location: "Tirupattur, Tamil Nadu",
      type: "Full-time",
      description: "Provide exceptional support to our valued customers."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <Briefcase className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Join Our Team
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Build the future of men's fashion with E-GentleFit.
            </p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Why E-GentleFit?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                At E-GentleFit, we're more than just a fashion brand – we're a team of passionate 
                individuals building something special. We value creativity, innovation, and a 
                commitment to excellence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-2">Growth</h3>
                  <p className="text-muted-foreground text-sm">Opportunities to learn and advance your career</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-2">Culture</h3>
                  <p className="text-muted-foreground text-sm">Collaborative, inclusive, and creative environment</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-2">Impact</h3>
                  <p className="text-muted-foreground text-sm">Make a real difference in fashion industry</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Open Positions
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {openPositions.map((job, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-xl mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-2">{job.description}</p>
                    </div>
                    <Button className="bg-accent text-primary hover:bg-accent/90 whitespace-nowrap">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Don't See a Role for You?
            </h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals. Send your resume to:
            </p>
            <a 
              href="mailto:elavarasanc93@gmail.com" 
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              <Mail className="w-5 h-5" />
              elavarasanc93@gmail.com
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
