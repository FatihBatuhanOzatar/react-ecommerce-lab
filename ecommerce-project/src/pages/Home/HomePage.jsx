import './HomePage.css';
import { Header } from '../../components/Header.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid.jsx';
export function HomePage({cart, loadCart}){
  const [products, setProducts]=useState([]);
  
  useEffect(()=>{
    const getHomeData = async ()=>{
      const response= await axios.get('/api/products');
      setProducts(response.data);
    };
    getHomeData();
  }, []); 

  return (
    <>
      <title>Ecommerce project</title>
      <Header cart={cart}/>
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}