import { useState } from 'react';
import { useCart } from '../context/CartContext';
import ThankYou from './ThankYou';

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleBuyNow = () => {
    setShowCheckout(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    const orderSummary = {
      orderId: 'ORD-' + Date.now(),
      customer: formData,
      products: cartItems.map(item => ({
        name: item.name,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      })),
      total: getTotalPrice(),
      paymentMethod: 'Cash on Delivery (COD)',
      orderDate: new Date().toISOString()
    };
    
    try {
      // Send data to webhook
      await fetch('https://hook.eu1.make.com/3km4koxm0hmok9gkijy921fykk1iiu4u', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderSummary),
      });
      
      console.log('Order placed and sent to webhook:', orderSummary);
      
      // Show thank you page
      setOrderData(orderSummary);
      setShowCheckout(false);
      setShowThankYou(true);
      clearCart();
    } catch (error) {
      console.error('Error sending order:', error);
      alert('There was an error placing your order. Please try again.');
    }
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  const closeThankYou = () => {
    setShowThankYou(false);
    setOrderData(null);
    setFormData({ name: '', email: '', phone: '', address: '' });
    closeCart();
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 98,
        }}
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '450px',
          height: '100vh',
          backgroundColor: '#1a1a1a',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold' }}>
            YOUR CART ({cartItems.length})
          </h2>
          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
          }}
        >
          {cartItems.length === 0 ? (
            <p style={{ color: '#ffffff60', textAlign: 'center', marginTop: '40px' }}>
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.id}-${item.color}-${item.size}`}
                style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '24px',
                  paddingBottom: '24px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {/* Product Image */}
                <img
                  src={item.frontImage}
                  alt={item.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                  }}
                />

                {/* Product Info */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 'bold' }}>
                    {item.name}
                  </h3>
                  <p style={{ color: '#ffffff60', fontSize: '14px', marginBottom: '4px' }}>
                    {item.color} | Size: {item.size}
                  </p>
                  <p style={{ color: '#ffffff', fontSize: '16px', fontWeight: 'bold' }}>
                    ₱{item.price.toLocaleString()}
                  </p>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                    >
                      −
                    </button>
                    <span style={{ color: '#ffffff', minWidth: '24px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id, item.color, item.size)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ffffff40',
                    fontSize: '18px',
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                  }}
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Total */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold' }}>
                Total:
              </span>
              <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>
                ₱{getTotalPrice().toLocaleString()}
              </span>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#ffffff',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              BUY NOW
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
              padding: '32px',
              position: 'relative',
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeCheckout}
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

            <h2 style={{ color: '#1a1a1a', fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>
              Checkout
            </h2>

            {/* Order Summary */}
            <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
              <h3 style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '0.05em' }}>
                ORDER SUMMARY
              </h3>
              {cartItems.map((item) => (
                <div
                  key={`checkout-${item.id}-${item.color}-${item.size}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    fontSize: '14px',
                  }}
                >
                  <span style={{ color: '#666666' }}>
                    {item.name} ({item.color}, Size {item.size}) x{item.quantity}
                  </span>
                  <span style={{ color: '#1a1a1a' }}>
                    ₱{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div
                style={{
                  borderTop: '1px solid rgba(0,0,0,0.1)',
                  marginTop: '12px',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ color: '#1a1a1a', fontWeight: 'bold' }}>Total:</span>
                <span style={{ color: '#1a1a1a', fontWeight: 'bold', fontSize: '18px' }}>
                  ₱{getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            {/* Customer Info Form */}
            <form onSubmit={handlePlaceOrder}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#666666', fontSize: '12px', marginBottom: '6px', letterSpacing: '0.05em' }}>
                  FULL NAME
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Juan Dela Cruz"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                    color: '#1a1a1a',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#666666', fontSize: '12px', marginBottom: '6px', letterSpacing: '0.05em' }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="juan@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                    color: '#1a1a1a',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#666666', fontSize: '12px', marginBottom: '6px', letterSpacing: '0.05em' }}>
                  PHONE NUMBER
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="09XX XXX XXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                    color: '#1a1a1a',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#666666', fontSize: '12px', marginBottom: '6px', letterSpacing: '0.05em' }}>
                  DELIVERY ADDRESS
                </label>
                <textarea
                  name="address"
                  placeholder="Street, Barangay, City, Province"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                    color: '#1a1a1a',
                    fontSize: '14px',
                    resize: 'none',
                  }}
                />
              </div>

              {/* Payment Method */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', color: '#666666', fontSize: '12px', marginBottom: '6px', letterSpacing: '0.05em' }}>
                  PAYMENT METHOD
                </label>
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '6px',
                    color: '#1a1a1a',
                    fontSize: '14px',
                  }}
                >
                  Cash on Delivery (COD)
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
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
                PLACE ORDER
              </button>
            </form>
          </div>
        </div>
      )}
      {showThankYou && (
        <ThankYou orderData={orderData} onClose={closeThankYou} />
      )}
    </>
  );
};

export default Cart;
