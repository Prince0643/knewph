const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0d0d0d', padding: '48px 16px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Main Footer Content */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '32px', marginBottom: '32px' }}>
          {/* Brand */}
          <div style={{ flex: '1 1 300px' }}>
            <img 
              src="/images/knewlogo.png" 
              alt="knew." 
              style={{ height: '32px', width: 'auto', filter: 'brightness(0) invert(1)', marginBottom: '16px' }}
            />
            <p style={{ color: '#ffffff60', fontSize: '14px', lineHeight: '1.6' }}>
              Premium workwear meets streetwear. Designed for those who craft their own path.
            </p>
          </div>

          {/* Contact */}
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ color: '#ffffff', fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '16px' }}>
              CONTACT
            </h4>
            <p style={{ color: '#ffffff60', fontSize: '14px', marginBottom: '8px' }}>
              hello@knew.ph
            </p>
            <p style={{ color: '#ffffff60', fontSize: '14px' }}>
              Bauang, Philippines, 2501
            </p>
          </div>

          {/* Social */}
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ color: '#ffffff', fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '16px' }}>
              FOLLOW US
            </h4>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a 
                href="https://www.facebook.com/profile.php?id=61586052712088" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#ffffff', fontSize: '14px', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff80'}
                onMouseLeave={(e) => e.target.style.color = '#ffffff'}
              >
                Facebook
              </a>
              <a 
                href="https://www.instagram.com/knew.ph" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#ffffff', fontSize: '14px', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff80'}
                onMouseLeave={(e) => e.target.style.color = '#ffffff'}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #ffffff20', marginBottom: '24px' }}></div>

        {/* Copyright */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#ffffff40', fontSize: '12px' }}>
            © 2025 knew. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
