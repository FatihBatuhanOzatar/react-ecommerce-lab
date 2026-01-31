//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router';
import { HomePage } from './pages/HomePage';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path="checkout" element={<div>test checkout page</div>}></Route>
    </Routes>
  )
}

export default App
