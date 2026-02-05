import { useParams } from 'react-router'; // URL'deki parametreleri okumak için
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Header } from '../components/Header';

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams(); // URL'deki ID'leri aldık
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTracking() {
      // Backend'den siparişi products bilgisiyle çekiyoruz
      try {
        const response = await axios.get(`/api/orders/${orderId}?expand=products`);
        
        // Products array'inden productId'ye göre ilgili product'ı buluyoruz
        const order = response.data;
        const productData = order.products?.find(p => p.productId === productId);
        
        if (!productData) {
          throw new Error(`Product ${productId} not found in order ${orderId}`);
        }
        
        setTrackingData(productData);
      } catch (error) {
        setError(error.message);
        console.error('Tracking fetch error:', error);
      }
    }
    fetchTracking();
  }, [orderId, productId]);

  if (error) {
    return (
      <>
        <Header cart={cart} />
        <div className="tracking-page">
          <div className="order-tracking">
            <div style={{ color: 'red', padding: '20px' }}>
              Error: {error}
            </div>
            <a className="back-to-orders-link link-primary" href="/orders">
              View all orders
            </a>
          </div>
        </div>
      </>
    );
  }

  if (!trackingData) return <div>Loading tracking details...</div>;
  
  if (!trackingData.product) {
    return (
      <>
        <Header cart={cart} />
        <div className="tracking-page">
          <div className="order-tracking">
            <div style={{ color: 'red', padding: '20px' }}>
              Error: Product data not found
            </div>
            <a className="back-to-orders-link link-primary" href="/orders">
              View all orders
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            Arriving on {dayjs(trackingData.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {trackingData.product.name}
          </div>

          <div className="product-info">
            Quantity: {trackingData.quantity}
          </div>

          <img className="product-image" src={trackingData.product.image} />

          {/* İlerleme çubuğu ve etiketleri buradaki verilere göre güncellenebilir */}
          {/* ... */}
        </div>
      </div>
    </>
  );
}