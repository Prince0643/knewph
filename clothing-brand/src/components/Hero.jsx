import React from 'react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <img 
          src="/images/hero.png" 
          alt="Hero" 
          className="w-full h-full object-cover"
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
          style={{ paddingBottom: '28px' }}
        />
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl" style={{ paddingBottom: '32px' }}>
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
  );
};

export default Hero;
