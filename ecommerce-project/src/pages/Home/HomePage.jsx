import './HomePage.css';
import { Header } from '../../components/Header.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid.jsx';
import { useLocation } from 'react-router';
export function HomePage({cart, loadCart, setIsGameOpen}){
  const [products, setProducts]=useState([]);

  const location=useLocation();
  const queryParams= new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";

  const filteredProducts=products.filter((product)=>{
    return(
      product.name.toLowerCase().includes(searchTerm) ||
      product.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
  })
  
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
      <Header cart={cart} setIsGameOpen={setIsGameOpen}/>
      <div className="home-page">
        <ProductsGrid filteredProducts={filteredProducts} loadCart={loadCart} />
      </div>
    </>
  );
}