"use client";  // Añadir esta línea

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const { data: session } = useSession();
  const router = useRouter();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState('');

  if (!session || session.user.role !== 'ADMIN') {
    router.push('/');
    return null;
  }

  const handleAddQuestion = async () => {
    try {
      const response = await fetch('/api/addQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, options, answer }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error adding question');
      }
      setQuestion('');
      setOptions(['', '', '', '']);
      setAnswer('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-6 text-blue-500">Administración</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Pregunta"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Opción ${index + 1}`}
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            className="w-full px-4 py-2 border rounded-md"
          />
        ))}
        <input
          type="text"
          placeholder="Respuesta correcta"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        <button onClick={handleAddQuestion} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">
          Agregar Pregunta
        </button>
      </div>
    </div>
  );
}
