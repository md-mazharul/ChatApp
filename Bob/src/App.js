import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

// ⚠️ IMPORTANT: To use on another device, change 'localhost' to your computer's IPv4 address!
// Example: const SERVER_URL = 'http://192.168.1.15:5000';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
const socket = io(SERVER_URL);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off('receive_message');
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      // Send to Server as the 'Agent'
      socket.emit('send_message', { sender: 'Agent', text: message });
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Bob</h2>

      {/* Chat Window */}
      <div style={{ 
        border: '2px solid #333', 
        height: '400px', 
        overflowY: 'scroll', 
        padding: '20px', 
        background: '#f4f4f4',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {chat.map((msg, index) => (
          <div key={index} style={{
            alignSelf: msg.sender === 'Agent' ? 'flex-end' : 'flex-start',
            background: msg.sender === 'Agent' ? '#28a745' : '#e5e5ea', // Green for Agent
            color: msg.sender === 'Agent' ? 'white' : 'black',
            padding: '10px 15px',
            borderRadius: '20px',
            marginBottom: '10px',
            maxWidth: '70%'
          }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your reply here..."
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
          Send Reply
        </button>
      </div>
    </div>
  );
}

export default App;
