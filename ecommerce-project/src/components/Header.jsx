import './header.css';
import { useState } from 'react';

export function Header({ cart, setIsGameOpen }) { // setIsGameOpen prop'unu ekledik
  let totalQuantity = 0;

  const [searchText, setSearchText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Yazımı düzelttik: isSidebarOpen

  const handleSearch = () => {
    if (searchText) {
      window.location.href = `/?search=${searchText}`;
    } else {
      window.location.href = '/';
    }
  };

  cart.forEach(cartItem => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      {/* 1. SIDEBAR YAPISI */}
      {isSidebarOpen && (
        <>
          {/* Arka planı karartan gölge katmanı */}
          <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
          
          {/* Sol taraftan açılan menü kutusu */}
          <div className="sidebar">
            <div className="sidebar-header">
              <h3>Menu</h3>
              <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>✕</button>
            </div>
            
            <nav className="sidebar-content">
              <div className="sidebar-item game-link" onClick={() => {
                setIsGameOpen(true);
                setIsSidebarOpen(false);
              }}>
                {/* Oyun için özel ikon */}
                <img src="images/icons/clothes-icon2.png" className="icon" style={{ width: '24px' }} alt="game" />
                <span style={{ fontWeight: 'bold', color: '#fac000' }}>İndirim Oyunu Oyna</span>
              </div>
              
              <div className="sidebar-divider" style={{ height: '1px', backgroundColor: '#DDD', margin: '10px 0' }}></div>
              
              <a href="/" className="sidebar-item">Ana Sayfa</a>
              <a href="/orders" className="sidebar-item">Siparişlerim</a>
            </nav>
          </div>
        </>
      )}

      <div className="left-section">
        {/* 1. İKONU LOGONUN SOLUNA ALDIK */}
        <div className="hamburger-menu" onClick={() => setIsSidebarOpen(true)}>
          <img src="images/icons/menu-icon.png" className="menu-icon" alt="menu" />
        </div>

        <a href="/" className="header-link">
          <img className="logo" src="images/logo-whitesup.png" alt="logo" />
          <img className="mobile-logo" src="images/mobile-logo-white.png" alt="mobile-logo" />
        </a>
      </div>

      <div className="middle-section">
        <input 
          className="search-bar" 
          type="text" 
          placeholder="Search"
          value={searchText} 
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <button className="search-button" onClick={handleSearch}>
          <img className="search-icon" src="images/icons/search-icon.png" alt="search" />
        </button>
      </div>

      <div className="right-section">
        <a className="orders-link header-link" href="/orders">
          <span className="orders-text">Orders</span>
        </a>

        <a className="cart-link header-link" href="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" alt="cart" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </a>
      </div>
    </div>
  );
}