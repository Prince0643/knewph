import { useState } from 'react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems, openCart } = useCart();

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#shop' },
    { name: 'Collections', href: '#collections' },
    { name: 'About', href: '#about' },
  ];

  return (
    <>
      <style>{`
        .nav-link-hover:hover {
          color: #000000 !important;
        }
      `}</style>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 relative">
          {/* Logo - Absolute Left */}
          <div className="absolute left-4">
            <a href="#" className="block">
              <img 
                src="/images/knewlogo.png" 
                alt="knew." 
                className="h-8 w-auto brightness-0 invert"
              />
            </a>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:block">
            <div className="flex items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-brand-white hover:bg-white text-base font-semibold tracking-wide transition-all duration-300 px-4 py-2 nav-link-hover"
                  style={{ color: '#ffffff', padding: '8px 16px' }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Cart & Mobile Menu Button - Absolute Right */}
          <div className="flex items-center gap-x-4 absolute right-4">
            {/* Cart Icon */}
            <button 
              onClick={openCart}
              className="text-[#ffffff] hover:text-white/80 transition-colors p-2 relative"
              data-cart-trigger
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {getTotalItems() > 0 && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#ffffff',
                    color: '#1a1a1a',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Search Icon */}
            <button className="text-[#ffffff] hover:text-white/80 transition-colors p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#ffffff] hover:text-white/80 transition-colors p-2 mr-4"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
              {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md animate-slideDown" style={{ transformOrigin: 'top' }}>
          <div className="px-8 pt-4 pb-6" style={{ display: 'flex', flexDirection: 'column' }}>
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-[#ffffff] hover:bg-white text-base font-semibold tracking-wide transition-all duration-300 animate-slideIn px-4 py-3 nav-link-hover"
                style={{ color: '#ffffff', paddingLeft: '24px', animationDelay: `${index * 100}ms`, padding: '12px 24px' }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>

      {/* Announcement Marquee */}
      <div style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', whiteSpace: 'nowrap', position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 40 }}>
        <div style={{ display: 'inline-block', animation: 'marquee 30s linear infinite' }}>
          <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', padding: '8px 48px', display: 'inline-block' }}>
            NEW COLLECTION OUT NOW    RESTOCKED ITEMS    
          </span>
          <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', padding: '8px 48px', display: 'inline-block' }}>
            NEW COLLECTION OUT NOW    RESTOCKED ITEMS    
          </span>
          <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', padding: '8px 48px', display: 'inline-block' }}>
            NEW COLLECTION OUT NOW    RESTOCKED ITEMS    
          </span>
          <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', padding: '8px 48px', display: 'inline-block' }}>
            NEW COLLECTION OUT NOW    RESTOCKED ITEMS    
          </span>
          <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', padding: '8px 48px', display: 'inline-block' }}>
            NEW COLLECTION OUT NOW    RESTOCKED ITEMS    
          </span>
          <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', padding: '8px 48px', display: 'inline-block' }}>
            NEW COLLECTION OUT NOW    RESTOCKED ITEMS    
          </span>
          <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', padding: '8px 48px', display: 'inline-block' }}>
            NEW COLLECTION OUT NOW    RESTOCKED ITEMS    
          </span>
          <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', padding: '8px 48px', display: 'inline-block' }}>
            NEW COLLECTION OUT NOW    RESTOCKED ITEMS    
          </span>
          <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', padding: '8px 48px', display: 'inline-block' }}>
            NEW COLLECTION OUT NOW    RESTOCKED ITEMS    
          </span>
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
};

export default Navbar;