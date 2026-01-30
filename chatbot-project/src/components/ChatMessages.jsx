import { ChatMessage } from "./ChatMessage.jsx";
import './ChatMessages.css';
function ChatMessages({ chatMessages }) {
  return (
    <div className="messages-window">
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage 
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
            time={chatMessage.time}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;