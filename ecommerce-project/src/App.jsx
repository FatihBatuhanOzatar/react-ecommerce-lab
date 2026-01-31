//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router';
import { HomePage } from './pages/HomePage';

import { CheckoutPage } from './pages/CheckoutPage.jsx';
import { OrdersPage } from './pages/OrdersPage.jsx';
import { TrackingPage } from './pages/TrackingPage.jsx';


function App() {
  //const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path="checkout" element={<CheckoutPage />}></Route>
      <Route path="orders" element={<OrdersPage />}/>
      <Route path="tracking" element={<TrackingPage />}/>
    </Routes>
  )
}

export default App
