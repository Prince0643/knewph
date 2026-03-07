const ThankYou = ({ orderData, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '40px',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#1a1a1a',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {/* Success Icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2
          style={{
            color: '#1a1a1a',
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '16px',
          }}
        >
          Thank You!
        </h2>

        <p
          style={{
            color: '#666666',
            fontSize: '16px',
            marginBottom: '24px',
            lineHeight: '1.6',
          }}
        >
          Your order has been placed successfully.
          <br />
          Please check your email for order confirmation.
        </p>

        {orderData && (
          <div
            style={{
              backgroundColor: '#f5f5f5',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'left',
            }}
          >
            <h3
              style={{
                color: '#1a1a1a',
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '16px',
                letterSpacing: '0.05em',
              }}
            >
              ORDER SUMMARY
            </h3>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ color: '#666666', fontSize: '12px' }}>Order ID:</span>
              <p style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: '500' }}>
                #{orderData.orderId}
              </p>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ color: '#666666', fontSize: '12px' }}>Total:</span>
              <p style={{ color: '#1a1a1a', fontSize: '18px', fontWeight: 'bold' }}>
                ₱{orderData.total.toLocaleString()}
              </p>
            </div>
            <div>
              <span style={{ color: '#666666', fontSize: '12px' }}>Payment:</span>
              <p style={{ color: '#1a1a1a', fontSize: '14px' }}>
                {orderData.paymentMethod}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
