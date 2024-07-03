"use client";

// page.tsx
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';

const fallbackResponses = [
  "Lo siento, no tengo la respuesta en este momento.",
  "No estoy seguro de eso, pero te lo notificaré más adelante.",
  "Actualmente no tengo información sobre eso.",
  "Esa es una buena pregunta. Te responderé más adelante.",
  "Estoy aprendiendo sobre eso, te mantendré informado.",
  "Lo siento, no puedo responder eso en este momento.",
  "No tengo la respuesta ahora, pero lo investigaré.",
  "Esa información no está disponible ahora mismo.",
  "No tengo datos sobre eso ahora mismo.",
  "Lo siento, pero no tengo una respuesta para eso ahora."
];

const cache = {};
const CACHE_EXPIRY_TIME = 60000; // 60 seconds

const cleanCache = () => {
  const now = Date.now();
  for (const [key, value] of Object.entries(cache)) {
    if (now - value.timestamp > CACHE_EXPIRY_TIME) {
      delete cache[key];
    }
  }
};

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const messageListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(cleanCache, CACHE_EXPIRY_TIME);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageText = message.trim();
    if (messageText.length === 0 || isTyping) return;

    addMessage(messageText, 'user');
    setMessage('');
    setShowMessages(true);

    if (cache[messageText]) {
      addMessageWithTyping(cache[messageText].response, true);
      return;
    }

    try {
      setIsTyping(true);
      const res = await axios.post('http://127.0.0.1:5000/chat', { message: messageText });
      const chunks = res.data.response.split(''); // Simular la recepción de fragmentos

      let reply = "";
      const $botMessage = addMessage("", 'bot');

      for (const chunk of chunks) {
        reply += chunk;
        await new Promise((resolve) => setTimeout(resolve, 50)); // Simular retraso en la escritura
        $botMessage.textContent(reply);
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }

      cache[messageText] = { response: reply, timestamp: Date.now() }; // Almacenar la respuesta en la caché
    } catch (error) {
      console.error("Error fetching response:", error);
      addMessageWithTyping("No tenemos comunicación con el servidor en este momento.", false);
    } finally {
      setIsTyping(false);
    }
  };

  const addMessage = (text, sender) => {
    const newMessage = { sender, text };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    return {
      textContent: (content) => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].text = content;
          return updatedMessages;
        });
      }
    };
  };

  const addMessageWithTyping = async (text, fromCache) => {
    const messageSuffix = fromCache ? " (obtenido de la caché)" : "";
    const fullMessage = text + messageSuffix;
    const chunks = fullMessage.split('');

    let reply = "";
    const $botMessage = addMessage("", 'bot');

    for (const chunk of chunks) {
      reply += chunk;
      await new Promise((resolve) => setTimeout(resolve, 50)); // Simular retraso en la escritura
      $botMessage.textContent(reply);
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-800 text-white p-4 pt-20">
      {!showMessages && (
        <>
          <img src="/icono.jpg" alt="Logo" className="w-20 h-20 mb-4 rounded-full" />
          <h1 className="text-4xl font-bold mb-8">Financial Mentor</h1>
          <div className="flex space-x-4 mb-8">
            <Link href="/crypto" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
              <div>
                <h2 className="mb-3 text-2xl font-semibold">
                  Crypto Data{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Explore crypto data templates for Next.js.
                </p>
              </div>
            </Link>
  
            <Link href="/stocks" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
              <div>
                <h2 className="mb-3 text-2xl font-semibold">
                  Stock Data{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Explore stock data templates for Next.js.
                </p>
              </div>
            </Link>
          </div>
        </>
      )}
      {showMessages && (
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -10, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="w-full max-w-4xl mb-2 p-4 bg-gray-700 rounded overflow-y-auto"
          style={{ minHeight: '300px', maxHeight: '400px', height: '400px' }}
          ref={messageListRef}
        >
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 p-2 rounded ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              {msg.sender === 'user' ? (
                <strong>You:</strong>
              ) : (
                <img src="/icono.jpg" alt="Bot Logo" className="inline-block w-6 h-6 mr-2 rounded-full" />
              )} {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="mb-2 p-2 rounded bg-gray-300 text-black">
              <img src="/icono.jpg" alt="Bot Logo" className="inline-block w-6 h-6 mr-2 rounded-full" />
              <span>...</span>
            </div>
          )}
        </motion.div>
      )}
      <motion.div
        initial={!showMessages ? { y: 0 } : { y: 10 }}
        animate={!showMessages ? { y: 0 } : { y: 10 }}
        transition={{ type: 'spring', stiffness: 50 }}
        className="w-full max-w-lg mb-2"
      >
        <form onSubmit={handleSubmit} className="w-full relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
            className="w-full p-3 pr-12 bg-gray-700 text-white border border-gray-600 rounded-full"
            disabled={isTyping}
          />
          <button
            type="submit"
            className={`absolute right-0 top-0 mt-1.5 mr-2 p-2 rounded-full flex items-center justify-center ${isTyping ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={isTyping}
          >
            {isTyping ? <FaSpinner className="animate-spin" size={20} /> : <FaPaperPlane size={20} />}
          </button>
          
        </form>

      </motion.div>
      
    
    </main>
  );
}
