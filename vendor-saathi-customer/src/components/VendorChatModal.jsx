import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, Phone, X, CheckCheck } from 'lucide-react';

export const VendorChatModal = () => {
  const { isVendorChatOpen, setIsVendorChatOpen } = useApp();
  const [messages, setMessages] = useState([
    { sender: 'customer', text: 'Hello, is tomato available?', time: '10:20 AM' },
    { sender: 'vendor', text: 'Hello Bhavana! Yes, tomato is available. 24 kg is ready in stock.', time: '10:21 AM' }
  ]);
  const [input, setInput] = useState('');

  if (!isVendorChatOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'customer', text: input, time: timeNow }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'vendor', text: "Yes, I will prepare your items right away!", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 800);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 220, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div className="vs-card animate-fade-in" style={{ width: '100%', maxWidth: '440px', height: '520px', borderRadius: '24px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#15803d', color: '#ffffff', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong style={{ fontSize: '16px', display: 'block' }}>Ramesh Grocery Support</strong>
            <span style={{ fontSize: '11px', opacity: 0.9 }}>🟢 Online • Mijar</span>
          </div>
          <button onClick={() => setIsVendorChatOpen(false)} style={{ color: '#ffffff' }}><X size={20} /></button>
        </div>

        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.sender === 'customer' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'customer' ? '#16a34a' : '#ffffff',
                color: msg.sender === 'customer' ? '#ffffff' : '#0f172a',
                padding: '10px 14px',
                borderRadius: '14px',
                maxWidth: '80%',
                fontSize: '13px',
                border: msg.sender === 'customer' ? 'none' : '1px solid #e2e8f0'
              }}
            >
              <div>{msg.text}</div>
              <div style={{ fontSize: '10px', textAlign: 'right', marginTop: '4px', opacity: 0.8 }}>{msg.time}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} style={{ padding: '12px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Type message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, padding: '8px 14px', borderRadius: '20px', border: '1px solid #cbd5e1', fontSize: '13px' }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '8px 14px', borderRadius: '50%' }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
