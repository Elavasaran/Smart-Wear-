import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      brand: 'E-GentleFit',
      brandSubtitle: 'Smart Men Wear',
      nav: {
        home: 'Home',
        shop: 'Shop',
        categories: 'Categories',
        deals: 'Deals',
        contact: 'Contact',
      },
      hero: {
        title: 'Elevate Your Style',
        subtitle: 'Discover the finest collection of men\'s fashion. Premium quality, smart prices.',
        shopNow: 'Shop Now',
        explore: 'Explore Collection',
      },
      categories: {
        title: 'Shop by Category',
        subtitle: 'Find your perfect style',
      },
      featured: {
        title: 'Featured Products',
        subtitle: 'Handpicked for you',
      },
      trending: {
        title: 'Trending Now',
        subtitle: 'Most popular this week',
      },
      product: {
        addToCart: 'Add to Cart',
        addToWishlist: 'Add to Wishlist',
        selectSize: 'Select Size',
        selectColor: 'Select Color',
        reviews: 'Reviews',
        description: 'Description',
        inStock: 'In Stock',
        outOfStock: 'Out of Stock',
      },
      cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        total: 'Total',
        checkout: 'Proceed to Checkout',
        continue: 'Continue Shopping',
      },
      features: {
        tryBeforeBuy: 'Try Before Buy',
        tryBeforeBuyDesc: 'Virtual try-on using AR',
        priceAlerts: 'Price Drop Alerts',
        priceAlertsDesc: 'Get notified when prices drop',
        groupBuying: 'Group Discounts',
        groupBuyingDesc: 'Save more with friends',
        multiLang: 'Multi-Language',
        multiLangDesc: 'Tamil, Hindi & English',
      },
      footer: {
        about: 'About Us',
        help: 'Help Center',
        returns: 'Returns',
        shipping: 'Shipping',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        copyright: '© 2024 E-GentleFit. All rights reserved.',
      },
    },
  },
  ta: {
    translation: {
      brand: 'E-GentleFit',
      brandSubtitle: 'ஸ்மார்ட் ஆண்கள் உடை',
      nav: {
        home: 'முகப்பு',
        shop: 'கடை',
        categories: 'வகைகள்',
        deals: 'சலுகைகள்',
        contact: 'தொடர்பு',
      },
      hero: {
        title: 'உங்கள் பாணியை உயர்த்துங்கள்',
        subtitle: 'ஆண்களுக்கான சிறந்த ஃபேஷன் தொகுப்பைக் கண்டறியுங்கள். பிரீமியம் தரம், ஸ்மார்ட் விலைகள்.',
        shopNow: 'இப்போது வாங்கு',
        explore: 'தொகுப்பை ஆராயுங்கள்',
      },
      categories: {
        title: 'வகை மூலம் வாங்குங்கள்',
        subtitle: 'உங்கள் சரியான பாணியைக் கண்டறியுங்கள்',
      },
      featured: {
        title: 'சிறப்பு தயாரிப்புகள்',
        subtitle: 'உங்களுக்காக தேர்ந்தெடுக்கப்பட்டது',
      },
      product: {
        addToCart: 'கூடையில் சேர்',
        addToWishlist: 'விருப்பப்பட்டியலில் சேர்',
        selectSize: 'அளவைத் தேர்ந்தெடு',
        selectColor: 'நிறத்தைத் தேர்ந்தெடு',
      },
      cart: {
        title: 'ஷாப்பிங் கூடை',
        empty: 'உங்கள் கூடை காலியாக உள்ளது',
        total: 'மொத்தம்',
        checkout: 'செக்அவுட்',
      },
    },
  },
  hi: {
    translation: {
      brand: 'E-GentleFit',
      brandSubtitle: 'स्मार्ट मेन वियर',
      nav: {
        home: 'होम',
        shop: 'शॉप',
        categories: 'श्रेणियाँ',
        deals: 'डील्स',
        contact: 'संपर्क',
      },
      hero: {
        title: 'अपनी स्टाइल को बढ़ाएं',
        subtitle: 'पुरुषों के फैशन का बेहतरीन संग्रह खोजें। प्रीमियम क्वालिटी, स्मार्ट कीमतें।',
        shopNow: 'अभी खरीदें',
        explore: 'संग्रह देखें',
      },
      categories: {
        title: 'श्रेणी के अनुसार खरीदारी करें',
        subtitle: 'अपनी परफेक्ट स्टाइल खोजें',
      },
      featured: {
        title: 'विशेष उत्पाद',
        subtitle: 'आपके लिए चुने गए',
      },
      product: {
        addToCart: 'कार्ट में डालें',
        addToWishlist: 'विशलिस्ट में डालें',
        selectSize: 'साइज़ चुनें',
        selectColor: 'रंग चुनें',
      },
      cart: {
        title: 'शॉपिंग कार्ट',
        empty: 'आपकी कार्ट खाली है',
        total: 'कुल',
        checkout: 'चेकआउट',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
