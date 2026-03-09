import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const collectionImages = [
  '/images/tc_collections/642764895_122114712681201757_7394994187547001976_n.jpg',
  '/images/tc_collections/642768528_122114712717201757_8652885872791572117_n.jpg',
  '/images/tc_collections/642783119_122114713191201757_3862070075968936317_n.jpg',
  '/images/tc_collections/643443482_122114713257201757_4721397527349384054_n.jpg',
  '/images/tc_collections/643455835_122114712507201757_3671630705052577863_n.jpg',
  '/images/tc_collections/643906298_122114713281201757_6646891545366515441_n.jpg',
  '/images/tc_collections/643939612_122114713455201757_6038227303509315726_n.jpg',
  '/images/tc_collections/644372470_122114715291201757_9094854661127977245_n.jpg',
  '/images/tc_collections/644433824_122114713341201757_4339172049418887621_n.jpg',
  '/images/tc_collections/644575712_122114713425201757_613076490705345721_n.jpg',
  '/images/tc_collections/644630204_122114712591201757_4131185576712466063_n.jpg',
  '/images/tc_collections/645251760_122114713371201757_3196467705742775356_n.jpg',
  '/images/tc_collections/645585929_122114712633201757_3003544393090892078_n.jpg',
  '/images/tc_collections/645657806_122114713515201757_2372861865953053943_n.jpg',
  '/images/tc_collections/645736810_122114714607201757_6533164401227911649_n.jpg',
];

const SIZES = ['M', 'L', 'XL'];

const ProductDetails = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState('White');
  const [showBack, setShowBack] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [selectedCollectionImage, setSelectedCollectionImage] = useState(null);
  const [isColorTransitioning, setIsColorTransitioning] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = {
    name: 'The Classic',
    price: 399,
    description: 'Premium workwear meets streetwear. The Classic tee features our signature logo embroidered on the chest, crafted from high-quality cotton for all-day comfort. Designed for those who craft their own path.',
    colors: ['White', 'Black'],
    images: {
      White: {
        front: '/images/the_classic_white/The Classic Front (White).png',
        back: '/images/the_classic_white/The Classic Back (White).png',
      },
      Black: {
        front: '/images/the_classic_black/The Classic Front (Black).png',
        back: '/images/the_classic_black/The Classic Back (Black).png',
      },
    },
  };

  const handleColorChange = (color) => {
    if (color === selectedColor) return;
    setIsColorTransitioning(true);
    setTimeout(() => {
      setSelectedColor(color);
      setTimeout(() => {
        setIsColorTransitioning(false);
      }, 300);
    }, 300);
  };

  const handleMouseDown = (e) => {
    if (zoomScale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomScale > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageClick = (e) => {
    if (!isDragging) {
      setShowBack(!showBack);
    }
  };

  const handleZoomChange = (newZoom) => {
    setZoomScale(newZoom);
    if (newZoom === 1) {
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const currentImages = product.images[selectedColor];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    addToCart({
      id: selectedColor === 'White' ? 1 : 2,
      name: product.name,
      color: selectedColor,
      price: product.price,
      size: selectedSize,
      frontImage: currentImages.front,
      backImage: currentImages.back,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size first');
      return;
    }
    addToCart({
      id: selectedColor === 'White' ? 1 : 2,
      name: product.name,
      color: selectedColor,
      price: product.price,
      size: selectedSize,
      frontImage: currentImages.front,
      backImage: currentImages.back,
    });
    setTimeout(() => {
      const cartButton = document.querySelector('[data-cart-trigger]');
      if (cartButton) cartButton.click();
    }, 100);
  };

  return (
    <section style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 16px' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          ← Back to Shop
        </button>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px' }}>
          {/* Product Image */}
          <div style={{ flex: '1 1 400px' }}>
            <div
              style={{
                backgroundColor: '#d0d0d0',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                aspectRatio: '1',
                cursor: zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                backgroundImage: `
                  linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => {
                setHovered(false);
                handleMouseUp();
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={handleImageClick}
            >
              {/* Front Image */}
              <img
                src={currentImages.front}
                alt={`${product.name} ${selectedColor} Front`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '0',
                  opacity: showBack || isColorTransitioning ? 0 : 1,
                  transform: `scale(${zoomScale}) translate(${imagePosition.x / zoomScale}px, ${imagePosition.y / zoomScale}px)`,
                  transition: isDragging ? 'none' : 'opacity 0.3s ease, transform 0.3s ease',
                  pointerEvents: 'none',
                }}
              />
              {/* Back Image */}
              <img
                src={currentImages.back}
                alt={`${product.name} ${selectedColor} Back`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '0',
                  opacity: !showBack || isColorTransitioning ? 0 : 1,
                  transform: `scale(${zoomScale}) translate(${imagePosition.x / zoomScale}px, ${imagePosition.y / zoomScale}px)`,
                  transition: isDragging ? 'none' : 'opacity 0.3s ease, transform 0.3s ease',
                  pointerEvents: 'none',
                }}
              />
            </div>
            <p style={{ color: '#ffffff60', textAlign: 'center', marginTop: '12px', fontSize: '14px' }}>
              {zoomScale > 1 ? 'Drag to pan, click to toggle view' : 'Click image to toggle front/back view'}
            </p>
            {/* Zoom Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
              <button
                onClick={() => handleZoomChange(Math.max(0.5, zoomScale - 0.25))}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: '2px solid #ffffff40',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  fontSize: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#ffffff';
                  e.target.style.backgroundColor = '#ffffff20';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#ffffff40';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                −
              </button>
              <span style={{ color: '#ffffff', fontSize: '14px', display: 'flex', alignItems: 'center', minWidth: '60px', justifyContent: 'center' }}>
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                onClick={() => handleZoomChange(Math.min(3, zoomScale + 0.25))}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: '2px solid #ffffff40',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  fontSize: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#ffffff';
                  e.target.style.backgroundColor = '#ffffff20';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#ffffff40';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                +
              </button>
              <button
                onClick={() => handleZoomChange(1)}
                style={{
                  padding: '0 16px',
                  height: '40px',
                  borderRadius: '8px',
                  border: '2px solid #ffffff40',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#ffffff';
                  e.target.style.backgroundColor = '#ffffff20';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#ffffff40';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div style={{ flex: '1 1 400px', color: '#ffffff' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
              {product.name}
            </h1>
            <p style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>
              ₱{product.price.toLocaleString()}
            </p>
            <p style={{ color: '#ffffff80', lineHeight: '1.6', marginBottom: '32px' }}>
              {product.description}
            </p>

            {/* Color Selection */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Color: {selectedColor}
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: color.toLowerCase(),
                      border: `3px solid ${selectedColor === color ? '#ffffff' : 'transparent'}`,
                      cursor: 'pointer',
                      boxShadow: color.toLowerCase() === 'white' ? 'inset 0 0 0 1px #333' : 'none',
                      transition: 'all 0.3s ease',
                      transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Size
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: '56px',
                      height: '48px',
                      border: `2px solid ${selectedSize === size ? '#ffffff' : '#ffffff40'}`,
                      backgroundColor: selectedSize === size ? '#ffffff' : 'transparent',
                      color: selectedSize === size ? '#000000' : '#ffffff',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {/* Size Chart Button */}
              <button
                onClick={() => setSelectedCollectionImage('/images/The Classic Size chart.png')}
                style={{
                  marginTop: '16px',
                  padding: '4px 16px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #ffffff',
                  color: '#000000',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e0e0e0';
                  e.target.style.borderColor = '#e0e0e0';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.borderColor = '#ffffff';
                }}
              >
                View Size Chart
              </button>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '16px',
                border: '2px solid #ffffff',
                backgroundColor: 'transparent',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '12px',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ffffff';
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              style={{
                width: '100%',
                padding: '16px',
                border: 'none',
                backgroundColor: '#ffffff',
                color: '#000000',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffffff')}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Collection Gallery */}
        <div style={{ marginTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {collectionImages.map((src, index) => (
              <div
                key={index}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  aspectRatio: '1',
                }}
              >
                <img
                  src={src}
                  alt={`Collection ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                  onClick={() => setSelectedCollectionImage(src)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collection Image Modal */}
      {selectedCollectionImage && (
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
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedCollectionImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedCollectionImage(null)}
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
              zIndex: 101,
            }}
          >
            ✕
          </button>

          {/* Modal Image */}
          <img
            src={selectedCollectionImage}
            alt="Collection Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
