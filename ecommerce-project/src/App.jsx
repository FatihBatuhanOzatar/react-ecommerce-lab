import './App.css'
import {Routes, Route} from 'react-router';
import { HomePage } from './pages/Home/HomePage.jsx';
import axios from 'axios';
import { CheckoutPage } from './pages/checkout/CheckoutPage.jsx';
import { OrdersPage } from './pages/orders/OrdersPage.jsx';
import { TrackingPage } from './pages/TrackingPage.jsx';
import { useState, useEffect } from 'react';


function App() {
  const [cart, setCart]=useState([]);

  useEffect(()=>{
    const fetchAppData = async ()=>{
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    };
    fetchAppData();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>}></Route>
      <Route path="checkout" element={<CheckoutPage cart={cart}/>}></Route>
      <Route path="orders" element={<OrdersPage cart={cart}/>}/>
      <Route path="tracking" element={<TrackingPage />}/>
    </Routes>
  )
}

export default App
