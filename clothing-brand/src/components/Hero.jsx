import { useState, useEffect } from 'react';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Minimum loading time for smooth UX (1.5 seconds)
    const minLoadTime = setTimeout(() => {
      if (imageLoaded) {
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(minLoadTime);
  }, [imageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#0d0d0d',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.5s ease-out',
          }}
        >
          {/* Logo */}
          <img
            src="/images/knewlogo.png"
            alt="knew."
            style={{
              width: '120px',
              height: 'auto',
              marginBottom: '32px',
              filter: 'brightness(0) invert(1)',
            }}
          />
          
          {/* Spinner */}
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(255,255,255,0.2)',
              borderTop: '3px solid #ffffff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          
          {/* Loading Text */}
          <p
            style={{
              color: '#ffffff60',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: '24px',
            }}
          >
            Loading
          </p>

          {/* Add keyframes for spinner */}
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero.png" 
            alt="Hero" 
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
          />
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <img 
            src="/images/knewlogo.png" 
            alt="knew." 
            className="w-48 md:w-64 lg:w-80"
            style={{ paddingBottom: '28px', filter: 'brightness(0) invert(1)' }}
          />
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl hidden md:block" style={{ paddingBottom: '32px' }}>
            Premium workwear meets streetwear. Designed for those who craft their own path.
          </p>
          <div className="flex flex-col sm:flex-row gap-8">
            <button 
              onClick={() => scrollToSection('shop')}
              className="bg-white text-black font-semibold text-base tracking-wide hover:bg-gray-100 transition-colors" 
              style={{ padding: '10px 10px' }}
            >
              SHOP NOW
            </button>
            <button 
              onClick={() => scrollToSection('collections')}
              className="border-2 border-white text-white font-semibold text-base tracking-wide hover:bg-white hover:text-black transition-colors" 
              style={{ padding: '10px 10px' }}
            >
              VIEW COLLECTION
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default Hero;
