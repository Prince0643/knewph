import { useState } from 'react';
import { useCart } from '../context/CartContext';

const SIZES = ['M', 'L', 'XL'];

const Shop = () => {
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});
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

  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBack, setShowBack] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowBack(false);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowBack(false);
  };

  const toggleImage = () => {
    setShowBack(prev => !prev);
  };

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
                onClick={() => openModal(product)}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{ borderRadius: '12px', cursor: 'pointer' }}
              >
                <img
                  src={product.frontImage}
                  alt={`${product.name} ${product.color} Front`}
                  className="absolute inset-0 w-full h-full object-contain p-4 transition-all duration-300"
                  style={{ 
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

        {/* Size Chart */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <img 
            src="/images/The Classic Size chart.png" 
            alt="Size Chart" 
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '16px' }}
          />
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '32px',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 101
            }}
          >
            ✕
          </button>

          {/* Image Container */}
          <div 
            style={{ 
              position: 'relative',
              width: '100%',
              maxWidth: '600px',
              height: '75vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={(e) => {
              e.stopPropagation();
              toggleImage();
            }}
          >
            {/* Front Image */}
            <img 
              src={selectedProduct.frontImage} 
              alt="Front" 
              style={{ 
                position: 'absolute',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                opacity: showBack ? 0 : 1,
                transition: 'opacity 0.3s ease'
              }}
            />
            {/* Back Image */}
            <img 
              src={selectedProduct.backImage} 
              alt="Back" 
              style={{ 
                position: 'absolute',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                opacity: showBack ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
            />
          </div>

          {/* Toggle Indicators */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <div 
              style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: showBack ? '#ffffff40' : '#ffffff'
              }}
            />
            <div 
              style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '50%', 
                backgroundColor: showBack ? '#ffffff' : '#ffffff40'
              }}
            />
          </div>

          {/* Tap Hint */}
          <p style={{ color: '#ffffff60', marginTop: '16px', fontSize: '14px' }}>
            Tap to toggle
          </p>
        </div>
      )}
    </section>
  );
};

export default Shop;
