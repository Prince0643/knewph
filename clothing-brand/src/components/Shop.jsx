import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const SIZES = ['M', 'L', 'XL'];

const Shop = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const products = [
    {
      id: 1,
      name: 'The Classic',
      color: 'White',
      price: 399,
      frontImage: '/images/the_classic_white/The Classic Front (White).png',
      backImage: '/images/the_classic_white/The Classic Back (White).png',
    },
    {
      id: 2,
      name: 'The Classic',
      color: 'Black',
      price: 399,
      frontImage: '/images/the_classic_black/The Classic Front (Black).png',
      backImage: '/images/the_classic_black/The Classic Back (Black).png',
    },
    {
      id: 3,
      name: 'Against All Odds',
      color: 'White',
      price: null,
      comingSoon: true,
      frontImage: '/images/against_all_odds_white/Against all odds Front (White).png',
      backImage: '/images/against_all_odds_white/Against all odds Back (White).png',
    },
    {
      id: 4,
      name: 'Against All Odds',
      color: 'Black',
      price: null,
      comingSoon: true,
      frontImage: '/images/against_all_odds_black/Against all odds Front (Black).png',
      backImage: '/images/against_all_odds_black/Against all odds Back (Black).png',
    },
  ];

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product.id];
    if (!size && !product.comingSoon) {
      alert('Please select a size first');
      return;
    }
    addToCart({ ...product, size });
  };

  const handleBuyNow = (product) => {
    const size = selectedSizes[product.id];
    if (!size && !product.comingSoon) {
      alert('Please select a size first');
      return;
    }
    addToCart({ ...product, size });
    setTimeout(() => {
      const cartButton = document.querySelector('[data-cart-trigger]');
      if (cartButton) cartButton.click();
    }, 100);
  };

  return (
    <section id="shop" style={{ backgroundColor: '#1a1a1a', padding: '80px 16px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Product Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px' }}>
          {products.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              style={{ width: '280px', flexShrink: 0 }}
            >
              {/* Product Image Container */}
              <div 
                className="relative bg-brand-gray rounded-lg overflow-hidden aspect-square mb-4"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => product.name === 'The Classic' && navigate('/product/the-classic')}
                style={{ borderRadius: '12px', cursor: product.name === 'The Classic' ? 'pointer' : 'default' }}
              >
                {/* Front Image */}
                <img
                  src={product.frontImage}
                  alt={`${product.name} ${product.color} Front`}
                  className="absolute inset-0 w-full h-full object-contain p-4 transition-all duration-300"
                  style={{ 
                    opacity: hoveredProduct === product.id ? 0 : 1,
                    transform: hoveredProduct === product.id ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                {/* Back Image */}
                <img
                  src={product.backImage}
                  alt={`${product.name} ${product.color} Back`}
                  className="absolute inset-0 w-full h-full object-contain p-4 transition-all duration-300"
                  style={{ 
                    opacity: hoveredProduct === product.id ? 1 : 0,
                    transform: hoveredProduct === product.id ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-white text-lg font-semibold tracking-wide mb-1">
                  {product.name}
                </h3>
                <p className="text-white/60 text-sm mb-2">{product.color}</p>
                <p className="text-white text-xl font-bold">
                  {product.comingSoon ? 'Coming Soon' : `₱${product.price.toLocaleString()}`}
                </p>
              </div>

              {/* Size Selection */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px', marginBottom: '12px' }}>
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => !product.comingSoon && handleSizeSelect(product.id, size)}
                    disabled={product.comingSoon}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: `2px solid ${selectedSizes[product.id] === size ? '#ffffff' : '#ffffff40'}`,
                      backgroundColor: selectedSizes[product.id] === size ? '#ffffff' : 'transparent',
                      color: selectedSizes[product.id] === size ? '#000000' : '#ffffff',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: product.comingSoon ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      opacity: product.comingSoon ? 0.3 : 1,
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.comingSoon}
                className="w-full mt-4 py-3 border-2 border-white text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ padding: '12px 0' }}
              >
                {product.comingSoon ? 'COMING SOON' : 'ADD TO CART'}
              </button>
              {/* Buy Now Button */}
              <button
                onClick={() => handleBuyNow(product)}
                disabled={product.comingSoon}
                className="w-full mt-2 py-3 bg-white text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ padding: '12px 0' }}
              >
                {product.comingSoon ? 'COMING SOON' : 'BUY NOW'}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Shop;
