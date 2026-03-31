import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product, useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCartStore();
  const { toast } = useToast();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: 'Removed from Wishlist',
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: 'Added to Wishlist',
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="bg-card rounded-xl overflow-hidden border border-border/50 hover:border-accent/40 transition-all duration-400 shadow-sm hover:shadow-xl hover:shadow-accent/5">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badge */}
            {product.badge && (
              <motion.div 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-gold text-primary text-xs font-bold rounded-full shadow-gold"
              >
                {product.badge}
              </motion.div>
            )}

            {/* Discount Badge */}
            {discount > 0 && !product.badge && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="absolute top-3 left-3 px-3 py-1.5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full shadow-lg"
              >
                -{discount}%
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ scale: 1.1 }}
              className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <Button
                size="icon"
                variant="secondary"
                className={`w-10 h-10 rounded-full shadow-lg backdrop-blur-sm ${
                  inWishlist ? 'bg-accent text-accent-foreground' : 'bg-card/90 hover:bg-accent hover:text-accent-foreground'
                } transition-all duration-300`}
                onClick={handleToggleWishlist}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </Button>
            </motion.div>

            {/* Add to Cart Button */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <Button
                className="w-full bg-primary/95 backdrop-blur-sm text-primary-foreground hover:bg-primary font-medium shadow-lg"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Star className="w-4 h-4 fill-accent text-accent" />
              </motion.div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews})
              </span>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-accent transition-colors duration-300">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Colors with Animation */}
            <div className="flex items-center gap-2 mt-3">
              {product.colors.slice(0, 3).map((color, colorIndex) => (
                <motion.div
                  key={color}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + colorIndex * 0.1 }}
                  className="w-5 h-5 rounded-full border-2 border-border hover:border-accent transition-colors cursor-pointer hover:scale-110"
                  style={{
                    backgroundColor:
                      color.toLowerCase() === 'white'
                        ? '#fff'
                        : color.toLowerCase() === 'black'
                        ? '#1a1a1a'
                        : color.toLowerCase() === 'blue'
                        ? '#3b82f6'
                        : color.toLowerCase() === 'navy'
                        ? '#1e3a5f'
                        : color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray'
                        ? '#6b7280'
                        : color.toLowerCase() === 'brown'
                        ? '#8b4513'
                        : color.toLowerCase() === 'olive'
                        ? '#808000'
                        : color.toLowerCase() === 'burgundy'
                        ? '#800020'
                        : color.toLowerCase() === 'khaki'
                        ? '#c3b091'
                        : color.toLowerCase() === 'silver'
                        ? '#c0c0c0'
                        : color.toLowerCase() === 'gold'
                        ? '#ffd700'
                        : color.toLowerCase() === 'rose gold'
                        ? '#b76e79'
                        : color.toLowerCase() === 'pink'
                        ? '#ffc0cb'
                        : color.toLowerCase() === 'tortoise'
                        ? '#8b4513'
                        : color.toLowerCase() === 'space grey'
                        ? '#4a4a4a'
                        : color.toLowerCase().includes('blue')
                        ? '#4169e1'
                        : '#ddd',
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-muted-foreground font-medium">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
