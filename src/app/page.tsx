"use client";

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const messageListRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageText = message.trim();
    if (messageText.length === 0) return;

    addMessage(messageText, 'user');
    setMessage('');
    setShowMessages(true);

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
    } catch (error) {
      console.error("Error fetching response:", error);
      addMessage("Error fetching response.", 'bot');
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

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800 text-white p-4">
      {!showMessages && (
        <>
          <h1 className="text-4xl font-bold mb-8">Welcome to My Next.js App</h1>
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
          animate={{ y: -50, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="w-full max-w-lg mb-4 p-4 bg-gray-700 rounded overflow-y-auto"
          style={{ minHeight: '300px' }}
          ref={messageListRef}
        >
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 p-2 rounded ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
              <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="mb-2 p-2 rounded bg-gray-300 text-black">
              <strong>Bot:</strong> <span>...</span>
            </div>
          )}
        </motion.div>
      )}
      <motion.div
        initial={!showMessages ? { y: 0 } : { y: 50 }}
        animate={!showMessages ? { y: 0 } : { y: 50 }}
        transition={{ type: 'spring', stiffness: 50 }}
        className="w-full max-w-lg mb-8"
      >
        <form onSubmit={handleSubmit} className="w-full relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje"
            className="w-full p-4 pr-12 bg-gray-700 text-white border border-gray-600 rounded-full"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-2 mr-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 flex items-center justify-center"
          >
            <FaPaperPlane size={20} />
          </button>
        </form>
      </motion.div>
    </main>
  );
}
