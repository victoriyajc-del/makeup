import { useState, useEffect } from 'react';

export default function Toast({ messages }) {
  return (
    <div className="toast-container">
      {messages.map(msg => (
        <ToastItem key={msg.id} text={msg.text} />
      ))}
    </div>
  );
}

function ToastItem({ text }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return <div className="toast">{text}</div>;
}
