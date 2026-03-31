import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Ruler, Info } from 'lucide-react';

const SizeGuide = () => {
  const shirtSizes = [
    { size: 'S', chest: '36-38"', length: '27"', shoulder: '17"' },
    { size: 'M', chest: '38-40"', length: '28"', shoulder: '18"' },
    { size: 'L', chest: '40-42"', length: '29"', shoulder: '19"' },
    { size: 'XL', chest: '42-44"', length: '30"', shoulder: '20"' },
    { size: 'XXL', chest: '44-46"', length: '31"', shoulder: '21"' },
  ];

  const pantSizes = [
    { size: '28', waist: '28"', length: '40"', hip: '36"' },
    { size: '30', waist: '30"', length: '40"', hip: '38"' },
    { size: '32', waist: '32"', length: '41"', hip: '40"' },
    { size: '34', waist: '34"', length: '41"', hip: '42"' },
    { size: '36', waist: '36"', length: '42"', hip: '44"' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <Ruler className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Size Guide
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Find your perfect fit with our comprehensive size charts.
            </p>
          </div>
        </section>

        {/* Shirt Size Chart */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Shirts & T-Shirts
            </h2>
            <div className="max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full bg-card border border-border rounded-xl overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Size</th>
                    <th className="px-6 py-4 text-left font-semibold">Chest</th>
                    <th className="px-6 py-4 text-left font-semibold">Length</th>
                    <th className="px-6 py-4 text-left font-semibold">Shoulder</th>
                  </tr>
                </thead>
                <tbody>
                  {shirtSizes.map((item, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="px-6 py-4 font-medium">{item.size}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.chest}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.length}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.shoulder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pants Size Chart */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
              Jeans & Trousers
            </h2>
            <div className="max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full bg-card border border-border rounded-xl overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Size</th>
                    <th className="px-6 py-4 text-left font-semibold">Waist</th>
                    <th className="px-6 py-4 text-left font-semibold">Length</th>
                    <th className="px-6 py-4 text-left font-semibold">Hip</th>
                  </tr>
                </thead>
                <tbody>
                  {pantSizes.map((item, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="px-6 py-4 font-medium">{item.size}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.waist}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.length}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Measuring Tips */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Info className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-3">How to Measure</h3>
                    <ul className="text-muted-foreground space-y-2">
                      <li><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</li>
                      <li><strong>Waist:</strong> Measure around your natural waistline, at the narrowest point.</li>
                      <li><strong>Shoulder:</strong> Measure from one shoulder point to the other across the back.</li>
                      <li><strong>Length:</strong> Measure from the highest point of the shoulder to the desired length.</li>
                    </ul>
                  </div>
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

export default SizeGuide;
