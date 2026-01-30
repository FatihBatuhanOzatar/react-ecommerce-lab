import { useState } from 'react'
import {Chatbot} from 'supersimpledev';
import './ChatInput.css';
export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    if (inputText.trim() === "") return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: currentTime
      }
    ];
    setChatMessages(newChatMessages);

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: currentTime
      }
    ]);
    setInputText('');
  }

  return (
    <div className="input-area">
      <input 
        placeholder="send a message" 
        onChange={saveInputText}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        value={inputText}
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
}