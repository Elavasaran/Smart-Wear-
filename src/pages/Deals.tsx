import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, Users, Zap, Tag, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

// Flash deals with countdown
const flashDeals = [
  { ...products[0], flashPrice: 999, endsIn: 3600 * 2 },
  { ...products[3], flashPrice: 6999, endsIn: 3600 * 4 },
  { ...products[5], flashPrice: 3999, endsIn: 3600 * 6 },
];

// Group buying deals
const groupDeals = [
  {
    ...products[2],
    groupId: 'group-1',
    currentUsers: 3,
    maxUsers: 5,
    discountTiers: [
      { users: 3, discount: 10 },
      { users: 5, discount: 20 },
    ],
  },
  {
    ...products[9],
    groupId: 'group-2',
    currentUsers: 2,
    maxUsers: 5,
    discountTiers: [
      { users: 3, discount: 10 },
      { users: 5, discount: 20 },
    ],
  },
];

// Best offers
const bestOffers = products.slice(6, 12).map((p, i) => ({
  ...p,
  offerDiscount: [30, 40, 35, 50, 45, 40][i],
}));

const CountdownTimer = ({ endTime }: { endTime: number }) => {
  const [timeLeft, setTimeLeft] = useState(endTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-1 text-accent font-mono font-bold">
      <div className="bg-accent/20 px-2 py-1 rounded">
        {String(hours).padStart(2, '0')}
      </div>
      <span>:</span>
      <div className="bg-accent/20 px-2 py-1 rounded">
        {String(minutes).padStart(2, '0')}
      </div>
      <span>:</span>
      <div className="bg-accent/20 px-2 py-1 rounded">
        {String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Deals = () => {
  const { t } = useTranslation();
  const { addToCart } = useCartStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4">
            Exclusive <span className="text-accent">Deals</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Limited time offers you don't want to miss
          </p>
        </motion.div>

        {/* Flash Deals Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold">Flash Deals</h2>
            <span className="ml-auto text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" /> Limited Time Only
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {flashDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                variants={cardVariants}
                className="group relative bg-secondary rounded-2xl border border-border/50 overflow-hidden hover:border-accent/50 transition-all duration-300"
              >
                {/* Flash Badge */}
                <div className="absolute top-4 left-4 z-10 bg-gradient-gold text-primary px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Zap className="w-4 h-4" /> FLASH
                </div>

                {/* Discount Badge */}
                <div className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                  -{Math.round((1 - deal.flashPrice / deal.originalPrice!) * 100)}%
                </div>

                <div className="aspect-square overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-medium text-lg mb-2 line-clamp-1">{deal.name}</h3>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-accent">₹{deal.flashPrice}</span>
                    <span className="text-muted-foreground line-through">₹{deal.originalPrice}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <CountdownTimer endTime={deal.endsIn} />
                    <Button
                      size="sm"
                      onClick={() => addToCart({ ...deal, price: deal.flashPrice }, deal.sizes[0], deal.colors[0])}
                      className="bg-accent hover:bg-accent/90"
                    >
                      Grab Deal
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Group Buying Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold">Group Buying</h2>
            <span className="ml-auto text-sm text-accent font-medium">Join with friends & save more!</span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {groupDeals.map((deal) => {
              const currentDiscount = deal.discountTiers.find(
                (tier) => deal.currentUsers >= tier.users
              )?.discount || 0;
              const nextTier = deal.discountTiers.find(
                (tier) => deal.currentUsers < tier.users
              );

              return (
                <motion.div
                  key={deal.groupId}
                  variants={cardVariants}
                  className="bg-secondary rounded-2xl border border-border/50 overflow-hidden hover:border-accent/50 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 aspect-square md:aspect-auto overflow-hidden">
                      <img
                        src={deal.image}
                        alt={deal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs font-medium">
                          GROUP DEAL
                        </span>
                        {currentDiscount > 0 && (
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                            {currentDiscount}% OFF ACTIVE
                          </span>
                        )}
                      </div>

                      <h3 className="font-medium text-lg mb-2">{deal.name}</h3>

                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-accent">
                          ₹{Math.round(deal.price * (1 - currentDiscount / 100))}
                        </span>
                        <span className="text-muted-foreground line-through">₹{deal.price}</span>
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">
                            <Users className="w-4 h-4 inline mr-1" />
                            {deal.currentUsers}/{deal.maxUsers} joined
                          </span>
                          {nextTier && (
                            <span className="text-accent">
                              {nextTier.users - deal.currentUsers} more for {nextTier.discount}% off
                            </span>
                          )}
                        </div>
                        <Progress
                          value={(deal.currentUsers / deal.maxUsers) * 100}
                          className="h-2"
                        />
                      </div>

                      {/* Discount Tiers */}
                      <div className="flex gap-2 mb-4">
                        {deal.discountTiers.map((tier) => (
                          <div
                            key={tier.users}
                            className={`flex-1 text-center py-2 rounded-lg text-xs ${
                              deal.currentUsers >= tier.users
                                ? 'bg-accent/20 text-accent border border-accent/50'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {tier.users} users = {tier.discount}% off
                          </div>
                        ))}
                      </div>

                      <Button className="w-full bg-accent hover:bg-accent/90">
                        Join Group Deal
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Best Offers Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
              <Tag className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold">Best Offers</h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {bestOffers.map((offer) => (
              <motion.div
                key={offer.id}
                variants={cardVariants}
                className="group bg-secondary rounded-2xl border border-border/50 overflow-hidden hover:border-accent/50 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-2 rounded-lg font-bold">
                    {offer.offerDiscount}% OFF
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-medium text-lg mb-2 line-clamp-1">{offer.name}</h3>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-accent">
                      ₹{Math.round(offer.price * (1 - offer.offerDiscount / 100))}
                    </span>
                    <span className="text-muted-foreground line-through">₹{offer.price}</span>
                  </div>

                  <Link to={`/product/${offer.id}`}>
                    <Button variant="outline" className="w-full group/btn">
                      Grab Deal
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Deals;
