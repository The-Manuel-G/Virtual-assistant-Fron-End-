//app/game/Inicio/page.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { TailSpin } from 'react-loader-spinner';

export default function GameHome() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

      if (!session) {
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TailSpin color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {session && (
        <motion.main
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="flex min-h-screen flex-col items-center justify-start bg-gray-800 text-white p-4 pt-20"
        >
          <img src="/icono.jpg" alt="Logo" className="w-20 h-20 mb-4 rounded-full" />
          <motion.h1 initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-4xl font-bold mb-8">
            Inicio del Juego de Educación Financiera
          </motion.h1>
          <div className="flex space-x-4 mb-8">
            <Link href="/game" className="block px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
              Comenzar el Juego
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Salir
            </button>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
