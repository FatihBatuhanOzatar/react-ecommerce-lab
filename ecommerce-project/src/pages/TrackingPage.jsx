import { useParams } from 'react-router'; // URL'deki parametreleri okumak için
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams(); // URL'deki ID'leri aldık
  const [trackingData, setTrackingData] = useState(null);

  useEffect(() => {
    async function fetchTracking() {
      // Backend'den bu sipariş ve ürüne ait özel takip bilgisini istiyoruz
      const response = await axios.get(`/api/orders/${orderId}/products/${productId}`);
      setTrackingData(response.data);
    }
    fetchTracking();
  }, [orderId, productId]);

  if (!trackingData) return <div>Loading tracking details...</div>;

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