const About = () => {
  return (
    <section id="about" style={{ backgroundColor: '#1a1a1a', padding: '80px 16px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '0.05em' }}>
            ABOUT
          </h2>
          <div style={{ width: '96px', height: '4px', backgroundColor: '#ffffff', margin: '0 auto' }}></div>
        </div>

        {/* About Content */}
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#ffffff', fontSize: '24px', lineHeight: '1.8', marginBottom: '32px' }}>
            knew. is a Filipino clothing brand that embodies the spirit of determination and self-expression. 
            Founded with the belief that everyone has the power to craft their own path, we create premium workwear 
            that seamlessly blends with streetwear aesthetics.
          </p>
          <p style={{ color: '#ffffff90', fontSize: '20px', lineHeight: '1.8', marginBottom: '32px' }}>
            Each piece is thoughtfully designed for those who refuse to settle, who work hard to achieve their dreams, 
            and who wear their ambition with pride. Our collections feature bold designs, quality materials, and 
            versatile styles that transition effortlessly from the workshop to the streets.
          </p>
          <p style={{ color: '#ffffff90', fontSize: '20px', lineHeight: '1.8' }}>
            Against all odds, we rise. This is not just clothing—it's a statement of resilience, craftsmanship, 
            and the unwavering pursuit of excellence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
