import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, ArrowLeft } from 'lucide-react';

export const VendorChatView = () => {
  const { navigateTo } = useApp();
  const [messages, setMessages] = useState([
    { sender: 'customer', text: 'Hello, is tomato available?', time: '10:20 AM' },
    { sender: 'vendor', text: 'Hello Bhavana! Yes, tomato is available. 24 kg is ready in stock.', time: '10:21 AM' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'customer', text: input, time: 'Now' }]);
    setInput('');
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '24px 16px', maxWidth: '640px' }}>
      <button 
        onClick={() => navigateTo('order-tracking')}
        style={{ fontSize: '13px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}
      >
        <ArrowLeft size={16} /> Back to Order Tracking
      </button>

      <div className="vs-card" style={{ height: '500px', borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#15803d', color: '#ffffff', padding: '16px' }}>
          <strong>Ramesh Grocery Support</strong>
        </div>
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ alignSelf: m.sender === 'customer' ? 'flex-end' : 'flex-start', backgroundColor: m.sender === 'customer' ? '#16a34a' : '#f1f5f9', color: m.sender === 'customer' ? '#ffffff' : '#0f172a', padding: '10px 14px', borderRadius: '12px', fontSize: '13px' }}>
              {m.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} style={{ padding: '12px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px' }}>
          <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type message..." style={{ flex: 1, padding: '8px 12px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
          <button type="submit" className="btn-primary"><Send size={16} /></button>
        </form>
      </div>
    </div>
  );
};
