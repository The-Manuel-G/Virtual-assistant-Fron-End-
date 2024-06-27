"use client";

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaPaperPlane } from 'react-icons/fa';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/chat', { message });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error al enviar el mensaje", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-800 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Financial mentor</h1>
      <nav className="space-y-4 mb-8">
        <Link href="/stocks" className="text-xl font-medium text-blue-500 hover:underline">
          Stock Data
        </Link>
        <Link href="/crypto" className="text-xl font-medium text-blue-500 hover:underline">
          Crypto Data
        </Link>
      </nav>
      <div className="mb-4 w-full max-w-md p-4 bg-gray-700 rounded">
        <h2 className="text-2xl font-semibold mb-4">Respuesta:</h2>
        <p className="text-lg">{response}</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md relative mb-8">
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
    </main>
  );
}
