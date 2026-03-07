import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Shop from './components/Shop'
import Collections from './components/Collections'
import About from './components/About'
import Footer from './components/Footer'
import Cart from './components/Cart'

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Shop />
          <Collections />
          <About />
        </main>
        <Footer />
        <Cart />
      </div>
    </CartProvider>
  )
}

export default App
