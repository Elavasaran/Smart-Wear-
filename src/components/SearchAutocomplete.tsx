import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/store/cartStore';

interface SearchAutocompleteProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchAutocomplete = ({ isOpen, onClose }: SearchAutocompleteProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length >= 2) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const saveRecentSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      saveRecentSearch(searchTerm.trim());
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setQuery('');
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setQuery('');
    onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const popularSearches = ['Shirts', 'Watches', 'Jeans', 'T-Shirts', 'Jackets'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden pb-4"
        >
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-12 pr-10 py-3 bg-secondary rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {(query.length >= 2 || (!query && (recentSearches.length > 0 || true))) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 bg-secondary rounded-lg border border-border shadow-lg overflow-hidden"
              >
                {/* Product Suggestions */}
                {suggestions.length > 0 && (
                  <div className="p-2">
                    <p className="text-xs text-muted-foreground px-3 py-1 uppercase tracking-wide">Products</p>
                    {suggestions.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-accent/10 rounded-lg transition-colors text-left"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{product.name}</p>
                          <p className="text-sm text-accent">₹{product.price}</p>
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={() => handleSearch(query)}
                      className="w-full text-center py-2 text-sm text-accent hover:underline"
                    >
                      See all results for "{query}"
                    </button>
                  </div>
                )}

                {/* No suggestions but query exists */}
                {query.length >= 2 && suggestions.length === 0 && (
                  <div className="p-4 text-center text-muted-foreground">
                    <p>No products found for "{query}"</p>
                    <button
                      onClick={() => handleSearch(query)}
                      className="text-accent hover:underline mt-1"
                    >
                      Search anyway
                    </button>
                  </div>
                )}

                {/* Recent & Popular when no query */}
                {!query && (
                  <div className="p-2">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between px-3 py-1">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Recent
                          </p>
                          <button
                            onClick={clearRecentSearches}
                            className="text-xs text-muted-foreground hover:text-foreground"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 px-2">
                          {recentSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => handleSearch(term)}
                              className="px-3 py-1.5 bg-background rounded-full text-sm hover:bg-accent/10 transition-colors"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    <div>
                      <p className="text-xs text-muted-foreground px-3 py-1 uppercase tracking-wide flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Trending
                      </p>
                      <div className="flex flex-wrap gap-2 px-2 pb-2">
                        {popularSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleSearch(term)}
                            className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm hover:bg-accent/20 transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchAutocomplete;
