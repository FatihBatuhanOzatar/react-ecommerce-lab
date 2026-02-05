import React, { useState, useEffect, useRef } from 'react';
import './game.css';

export function Game({ onClose }) {
  const [basketPos, setBasketPos] = useState(50);
  const [items, setItems] = useState([]);
  const [particles, setParticles] = useState([]); // Kar ve parıltılar için
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const requestRef = useRef();
  const keysPressed = useRef({}); // Basılı tuşları takip eden referans
  const lastItemTimeRef = useRef(0);

  // 1. TUŞ TAKİP SİSTEMİ (Basılı tutmayı algılar)
  useEffect(() => {
    const down = (e) => keysPressed.current[e.key] = true;
    const up = (e) => delete keysPressed.current[e.key];
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, []);

  const updateGame = (time) => {
    if (gameOver) return;

    // 2. PÜRÜZSÜZ HAREKET (Her karede kontrol edilir)
    setBasketPos(prev => {
      let next = prev;
      if (keysPressed.current['ArrowLeft']) next -= 1.5; // Hız ayarı
      if (keysPressed.current['ArrowRight']) next += 1.5;
      return Math.max(5, Math.min(95, next));
    });

    // 3. KAR VE PARILTI ÜRETİMİ
    if (Math.random() > 0.92) {
      setParticles(prev => [...prev, {
        id: Math.random(),
        x: Math.random() * 100,
        y: -5,
        size: Math.random() * 5 + 2,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random()
      }]);
    }

    // 4. KIYAFET ÜRETİMİ
    if (time - lastItemTimeRef.current > 1200) {
      const newItem = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: -10,
        emoji: ['👕', '👗', '👔', '👖', '👟'][Math.floor(Math.random() * 5)]
      };
      setItems(prev => [...prev, newItem]);
      lastItemTimeRef.current = time;
    }

    // GÜNCELLEMELER (Düşme ve Çarpışma)
    setItems(prev => prev.map(i => ({ ...i, y: i.y + 0.8 })).filter(i => {
      const caught = i.y > 82 && i.y < 88 && Math.abs(i.x - basketPos) < 10;
      if (caught) setScore(s => s + 1);
      return i.y < 95 && !caught; // Zemine değince yok olur
    }));

    setParticles(prev => prev.map(p => ({ ...p, y: p.y + p.speed })).filter(p => p.y < 100));

    requestRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(requestRef.current);
  }, [basketPos, gameOver]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      if (score >= 20) setGameWon(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="game-overlay">
      <div className="game-box">
        
        <div className="game-stats">
          <span>⏱ {timeLeft}s</span>
          <span>🏆 {score}/20</span>
        </div>

        <div className="game-area">
          <button className="close-game-btn" onClick={onClose}>✕</button>
          {/* Kar Taneleri ve Parıltılar */}
          {particles.map(p => (
            <div key={p.id} className="particle" style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: `${p.size}px`, height: `${p.size}px`,
              opacity: p.opacity
            }} />
          ))}

          {/* Düşen Kıyafetler */}
          {items.map(item => (
            <div key={item.id} className="item" style={{ left: `${item.x}%`, top: `${item.y}%` }}>
              {item.emoji}
            </div>
          ))}

          {/* Sepet */}
          <div className="basket" style={{ left: `${basketPos}%` }}>🧺</div>
          
          {/* ZEMİN (FLOOR) */}
          <div className="game-floor"></div>
        </div>

        {gameOver && (
          <div className="game-modal">
            {gameWon ? (
              <div className="win-content">
                <h2>🎉 KAZANDIN!</h2>
                <div className="coupon-box">KOD: INDIRIM100</div>
              </div>
            ) : (
              <div className="lose-content"><h2>Zaman Doldu! 😢</h2></div>
            )}
            <button onClick={onClose} className="game-btn">Kapat</button>
          </div>
        )}
      </div>
    </div>
  );
}