import dayjs from "dayjs";
import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../money";
import { DeliveryOptions } from "./DeliveryOptions";

export function CartItemDetails({ cartItem, deliveryOptions, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(String(cartItem.quantity));

  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const toggleUpdateQuantity = () => {
    setIsUpdatingQuantity((prev) => !prev);
  };

  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
          "dddd, MMMM D"
        )}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              {isUpdatingQuantity ? (
                <input
                  type="text"
                  className="quantity-input"
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                />
              ) : (
                <span className="quantity-label">{cartItem.quantity}</span>
              )}
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={toggleUpdateQuantity}
            >
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteCartItem}
            >
              Delete
            </span>
          </div>
        </div>

        <DeliveryOptions
          cartItem={cartItem}
          deliveryOptions={deliveryOptions}
          loadCart={loadCart}
        />
      </div>
    </div>
  );
}

