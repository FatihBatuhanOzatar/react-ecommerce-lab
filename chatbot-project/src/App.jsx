import { useState } from 'react'
import './App.css'
import ChatMessages from './components/ChatMessages.jsx';
import { ChatInput } from './components/ChatInput.jsx';

function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      message: "who are you chatbot?",
      sender: 'user',
      id: 'id1',
      time: '13:00'
    },
    {
      message: "hellu, how can i help you?",
      sender: 'robot',
      id: 'id2',
      time: '13:00'
    },
    {
      message: "generate image of guts from Berserk 1997",
      sender: 'user',
      id: 'id3',
      time:'13:02'
    },
    {
      message: "Sorry, I didn't quite understand that. Let me know how I can help!",
      sender: 'robot',
      id: 'id4',
      time:'13:07'
    }
  ]);

  return (
    <div className="app-container">
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
