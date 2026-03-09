import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Shop from './components/Shop'
import About from './components/About'
import Footer from './components/Footer'
import Cart from './components/Cart'
import ProductDetails from './pages/ProductDetails'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Shop />
                  <About />
                </>
              } />
              <Route path="/product/the-classic" element={<ProductDetails />} />
            </Routes>
          </main>
          <Footer />
          <Cart />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
