import robotProfile from '../assets/robot.png';
import userProfile from '../assets/user.png';
import './ChatMessage.css';

export function ChatMessage(props) {
  // 1. time prop'unu buradan alıyoruz
  const { message, sender, time } = props;
  console.log("Gelen props:", props);
  return (
    <div className={`message-row ${sender}`}>
      {/* Robot avatarı solda */}
      {sender === 'robot' && <img src={robotProfile} className="avatar" />}
      
      {/* 2. Mesaj ve saati dikeyde hizalamak için yeni bir div */}
      <div className="message-content-wrapper">
        <div className="bubble">
          {message}
        </div>
        
        {/* 3. Saat bilgisini buraya ekledik */}
        {time && <span className="message-time">{time}</span>}
      </div>

      {/* Kullanıcı avatarı sağda */}
      {sender === 'user' && <img src={userProfile} className="avatar" />}
    </div>
  );
}
