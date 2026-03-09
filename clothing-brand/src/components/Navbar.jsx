import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems, openCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Available products for search
  const products = [
    { id: 1, name: 'The Classic', path: '/product/the-classic' },
  ];

  const filteredProducts = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSearchSelect = (path) => {
    navigate(path);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && filteredProducts.length > 0) {
      handleSearchSelect(filteredProducts[0].path);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#shop' },
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
            <Link to="/" className="block">
              <img 
                src="/images/knewlogo.png" 
                alt="knew." 
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:block">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-brand-white hover:bg-white text-base font-semibold tracking-wide transition-all duration-300 px-4 py-2 nav-link-hover"
                style={{ color: '#ffffff', padding: '8px 16px' }}
              >
                Home
              </Link>
              <a
                href={isHomePage ? '#shop' : '/#shop'}
                className="text-brand-white hover:bg-white text-base font-semibold tracking-wide transition-all duration-300 px-4 py-2 nav-link-hover"
                style={{ color: '#ffffff', padding: '8px 16px' }}
              >
                Shop
              </a>
              <a
                href={isHomePage ? '#about' : '/#about'}
                className="text-brand-white hover:bg-white text-base font-semibold tracking-wide transition-all duration-300 px-4 py-2 nav-link-hover"
                style={{ color: '#ffffff', padding: '8px 16px' }}
              >
                About
              </a>
            </div>
          </div>

          {/* Cart & Search Icons - Absolute Right at edge */}
          <div className="flex items-center gap-x-2" style={{ position: 'absolute', right: '-64px' }}>
            {/* Cart Icon */}
            <button 
              onClick={openCart}
              className="text-[#ffffff] hover:text-white/80 transition-colors flex items-center justify-center"
              style={{ width: '40px', height: '40px', position: 'relative' }}
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

            {/* Search */}
            <div style={{ position: 'relative' }}>
              {isSearchOpen ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search products..."
                    autoFocus
                    style={{
                      width: '140px',
                      height: '36px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '2px solid #ffffff40',
                      backgroundColor: '#1a1a1a',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                    className="sm:w-[200px]"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '18px',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="text-[#ffffff] hover:text-white/80 transition-colors flex items-center justify-center"
                  style={{ width: '40px', height: '40px' }}
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              )}
              
              {/* Search Results Dropdown */}
              {isSearchOpen && filteredProducts.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '44px',
                    right: 0,
                    width: '180px',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #ffffff30',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    zIndex: 50,
                  }}
                  className="sm:w-[240px]"
                >
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSearchSelect(product.path)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#ffffff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = '#ffffff20')}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#ffffff] hover:text-white/80 transition-colors flex items-center justify-center"
              style={{ width: '40px', height: '40px' }}
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
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-[#ffffff] hover:bg-white text-base font-semibold tracking-wide transition-all duration-300 animate-slideIn px-4 py-3 nav-link-hover"
              style={{ color: '#ffffff', paddingLeft: '24px', animationDelay: '0ms', padding: '12px 24px' }}
            >
              Home
            </Link>
            <a
              href={isHomePage ? '#shop' : '/#shop'}
              onClick={() => setIsMenuOpen(false)}
              className="block text-[#ffffff] hover:bg-white text-base font-semibold tracking-wide transition-all duration-300 animate-slideIn px-4 py-3 nav-link-hover"
              style={{ color: '#ffffff', paddingLeft: '24px', animationDelay: '100ms', padding: '12px 24px' }}
            >
              Shop
            </a>
            <a
              href={isHomePage ? '#about' : '/#about'}
              onClick={() => setIsMenuOpen(false)}
              className="block text-[#ffffff] hover:bg-white text-base font-semibold tracking-wide transition-all duration-300 animate-slideIn px-4 py-3 nav-link-hover"
              style={{ color: '#ffffff', paddingLeft: '24px', animationDelay: '200ms', padding: '12px 24px' }}
            >
              About
            </a>
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