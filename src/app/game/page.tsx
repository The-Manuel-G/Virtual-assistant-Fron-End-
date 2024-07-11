"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importa desde 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../utils/supabase/client';
import Question from '../../components/game/Question';
import Score from '../../components/game/Score';
import { questions } from '../../data/questions';
import { TailSpin } from 'react-loader-spinner';

export default function Game() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(10);
  const [playSound, setPlaySound] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
      if (!session) {
        router.push('/login');
      } else {
        await checkPlayLimit(session.user.id);
      }
    };

    const checkPlayLimit = async (userId: string) => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        setAlert({ message: "Error al verificar el límite de juego: " + error.message, type: 'error' });
        return;
      }

      const today = new Date();
      const lastPlayed = new Date(data.lastPlayed);
      const canPlay = data.gamesPlayed < 2 || (today.getDate() !== lastPlayed.getDate() ||
        today.getMonth() !== lastPlayed.getMonth() || today.getFullYear() !== lastPlayed.getFullYear());

      if (!canPlay) {
        setAlert({ message: "Límite de juego alcanzado. Solo puedes jugar dos veces al día.", type: 'info' });
        router.push('/');
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const intervalId = timer > 0 ? setInterval(() => setTimer(timer - 1), 1000) : null;
    if (timer === 0) {
      handleAnswerOptionClick(false);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  useEffect(() => {
    if (playSound) {
      const audio = new Audio(`/sounds/${playSound}.mp3`);
      audio.play();
      audio.onended = () => setPlaySound(null);
    }
  }, [playSound]);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('correcto');
      setPlaySound('correct');
    } else {
      setFeedback('incorrecto');
      setPlaySound('incorrect');
    }
    const nextQuestion = currentQuestion + 1;
    setTimeout(() => {
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setFeedback('');
        setTimer(10);
      } else {
        setShowScore(true);
        handleSubmitScore();
      }
    }, 1000);
  };

  const handleSubmitScore = async () => {
    try {
      const response = await fetch('/api/saveScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: session.user.id, score }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error saving score');
      }
      setAlert({ message: "Puntaje guardado correctamente", type: 'success' });
    } catch (error) {
      setAlert({ message: "Error guardando el puntaje: " + error.message, type: 'error' });
    }
  };

  const renderAlert = () => {
    if (!alert) return null;

    let alertClass = '';
    switch (alert.type) {
      case 'success':
        alertClass = 'bg-green-100 border-green-400 text-green-700';
        break;
      case 'error':
        alertClass = 'bg-red-100 border-red-400 text-red-700';
        break;
      case 'info':
        alertClass = 'bg-blue-100 border-blue-400 text-blue-700';
        break;
    }

    return (
      <div className={`border-l-4 p-4 mb-4 ${alertClass}`} role="alert">
        <p className="font-bold">{alert.message}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  return (
    <>
      {renderAlert()}
      <AnimatePresence>
        {showScore ? (
          <Score score={score} total={questions.length} />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10">
            <motion.div className="w-full bg-gray-800 rounded-full h-6" layout>
              <motion.div className="bg-green-500 h-6 rounded-full" style={{ width: `${(timer / 10) * 100}%` }} layout />
            </motion.div>
            <h2 className="text-3xl font-bold">{`Pregunta ${currentQuestion + 1}/${questions.length}`}</h2>
            <Question
              question={questions[currentQuestion]}
              onAnswerOptionClick={handleAnswerOptionClick}
              feedback={feedback}
            />
            <p className="text-xl">{`Tiempo restante: ${timer}s`}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
