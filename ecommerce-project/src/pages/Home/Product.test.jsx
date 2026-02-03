import {it, expect, describe, vi, beforeEach} from 'vitest';
import { Product } from './Product';
import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
vi.mock('axios');
import axios from 'axios';
describe('Product component', ()=>{
  let product;
  let loadCart;
  beforeEach(()=>{
    product={
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127
      },
      priceCents: 2095,
      keywords: ["sports", "basketballs"]
    };
    loadCart=vi.fn();
    render(<Product product={product} loadCart={loadCart}/>);
  });

  it('displays the product details correctly', ()=>{
    expect(screen.getByText('Intermediate Size Basketball')).toBeInTheDocument();

    expect(
      screen.getByText('$20.95')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('product-image')
    ).toHaveAttribute('src', 'images/products/intermediate-composite-basketball.jpg');
  });

  it('adds a product to the cart', async ()=>{

    const user=userEvent.setup();
    const addToCartButton= screen.getByTestId('add-to-cart-button');
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith(
      '/api/cart-items',
      {
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1
      }
    );
    expect(loadCart).toHaveBeenCalled();
  });
});