import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const categoryData = [
  {
    id: 'formal-shirts',
    name: 'Formal Shirts',
    tagline: 'Elegance for every occasion',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    filterCategory: 'shirts',
  },
  {
    id: 'casual-shirts',
    name: 'Casual Shirts',
    tagline: 'Relaxed style, refined comfort',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    filterCategory: 'shirts',
  },
  {
    id: 'tshirts',
    name: 'T-Shirts',
    tagline: 'Everyday essentials',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    filterCategory: 'tshirts',
  },
  {
    id: 'jeans',
    name: 'Jeans & Trousers',
    tagline: 'Perfect fit, timeless style',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    filterCategory: 'jeans',
  },
  {
    id: 'jackets',
    name: 'Jackets & Blazers',
    tagline: 'Layer up in style',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    filterCategory: 'jackets',
  },
  {
    id: 'watches',
    name: 'Watches',
    tagline: 'Time meets luxury',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    filterCategory: 'watches',
  },
  {
    id: 'sunglasses',
    name: 'Sunglasses',
    tagline: 'Shield your eyes in style',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    filterCategory: 'sunglasses',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Categories = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 lg:py-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4">
            Shop by <span className="text-accent">Category</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Find your perfect style from our curated collections
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {categoryData.map((category) => (
            <motion.div key={category.id} variants={cardVariants}>
              <Link
                to={`/shop?category=${category.filterCategory}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-2xl bg-secondary border border-border/50 shadow-lg hover:shadow-accent/20 hover:shadow-2xl transition-all duration-500">
                  {/* Image Container */}
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                      {category.tagline}
                    </p>
                    
                    {/* Hover Arrow */}
                    <div className="mt-4 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      <span className="text-sm font-medium">Explore</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/30 transition-all duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
