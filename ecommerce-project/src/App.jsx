import './App.css'
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/Home/HomePage.jsx';
import axios from 'axios';
import { CheckoutPage } from './pages/checkout/CheckoutPage.jsx';
import { OrdersPage } from './pages/orders/OrdersPage.jsx';
import { TrackingPage } from './pages/TrackingPage.jsx';
import { useState, useEffect } from 'react';
// 1. OYUN BİLEŞENİNİ İTHAL ET
import { Game } from './components/Game.jsx'; 

function App() {
  const [cart, setCart] = useState([]);
  // 2. OYUNUN AÇIK/KAPALI DURUMUNU BURADA TUTUYORUZ
  const [isGameOpen, setIsGameOpen] = useState(false);

  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      {/* 3. OYUN OVERLAY (Routes dışında olmalı ki her sayfanın üzerine binebilsin) */}
      {isGameOpen && <Game onClose={() => setIsGameOpen(false)} />}

      <Routes>
        {/* 4. setIsGameOpen fonksiyonunu sayfalara prop olarak gönderiyoruz */}
        <Route index element={
          <HomePage 
            cart={cart} 
            loadCart={loadCart} 
            setIsGameOpen={setIsGameOpen} 
          />
        } />
        
        <Route path="checkout" element={
          <CheckoutPage 
            cart={cart} 
            loadCart={loadCart} 
            setIsGameOpen={setIsGameOpen} 
          />
        } />
        
        <Route path="orders" element={
          <OrdersPage 
            cart={cart} 
            setIsGameOpen={setIsGameOpen} 
          />
        } />
        
        <Route path="tracking/:orderId/:productId" element={
          <TrackingPage 
            cart={cart} 
            setIsGameOpen={setIsGameOpen} 
          />
        } />
      </Routes>
    </>
  )
}

export default App