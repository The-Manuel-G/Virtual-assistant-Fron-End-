// app/game/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Question from '../../components/game/Question';
import Score from '../../components/game/Score';
import { questions } from '../../data/questions';

export default function Game() {
  const { data: session } = useSession();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(10);
  const [playSound, setPlaySound] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }
    const checkPlayLimit = async () => {
      const response = await fetch(`/api/checkPlayLimit?userId=${session.user.id}`);
      const data = await response.json();
      if (!data.canPlay) {
        alert("Límite de juego alcanzado. Solo puedes jugar dos veces al día.");
        router.push('/');
      }
    };
    checkPlayLimit();
  }, [session, router]);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      handleAnswerOptionClick(false);
    }
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
      alert("¡Correcto!");
    } else {
      setFeedback('incorrecto');
      setPlaySound('incorrect');
      alert("Incorrecto.");
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
        setFeedback('');
        setTimer(10);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowScore(true);
        handleSubmitScore();
      }, 1000);
    }
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
    } catch (error) {
      alert("Error guardando el puntaje: " + error.message);
    }
  };

  return (
    <div className="text-center py-10">
      {showScore ? (
        <Score score={score} total={questions.length} />
      ) : (
        <div className="space-y-4">
          <div className="w-full bg-gray-800 rounded-full h-6">
            <div className="bg-green-500 h-6 rounded-full" style={{ width: `${(timer / 10) * 100}%` }}></div>
          </div>
          <h2 className="text-3xl font-bold">{`Pregunta ${currentQuestion + 1}/${questions.length}`}</h2>
          <Question
            question={questions[currentQuestion]}
            onAnswerOptionClick={handleAnswerOptionClick}
            feedback={feedback}
          />
          <p className="text-xl">{`Tiempo restante: ${timer}s`}</p>
        </div>
      )}
    </div>
  );
}
