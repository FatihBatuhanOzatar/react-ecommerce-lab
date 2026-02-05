
import { Product } from "./Product";
//import {filteredProducts} from "./HomePage.jsx";
export function ProductsGrid({filteredProducts, loadCart}){

  return(
    <div className="products-grid">
      {filteredProducts.map((product) => {
        return (
          <Product 
            key={product.id} 
            product={product} 
            loadCart={loadCart} 
          />
        );
      })}
    </div>
  );
}