import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

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
      // Send to Server
      socket.emit('send_message', { sender: 'React', text: message });
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center' }}>Alex</h2>

      {/* Chat Window */}
      <div style={{ 
        border: '1px solid #ddd', 
        height: '400px', 
        overflowY: 'scroll', 
        padding: '20px', 
        background: '#f4f4f4',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {chat.map((msg, index) => (
          <div key={index} style={{
            alignSelf: msg.sender === 'React' ? 'flex-end' : 'flex-start',
            background: msg.sender === 'React' ? '#007bff' : '#e5e5ea',
            color: msg.sender === 'React' ? 'white' : 'black',
            padding: '10px 15px',
            borderRadius: '20px',
            marginBottom: '10px',
            maxWidth: '70%'
          }}>
            <strong>{msg.sender === 'React' ? 'Me' : 'Agent'}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type here..."
          style={{ flex: 1, padding: '10px', fontSize: '16px' }}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px', background: 'green', color: 'white', border: 'none' }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;