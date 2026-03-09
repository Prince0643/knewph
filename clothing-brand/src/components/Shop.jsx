import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const navigate = useNavigate();
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
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Shop;
