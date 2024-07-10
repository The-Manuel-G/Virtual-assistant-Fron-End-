//app/game/Inicio/page.tsx

"use client";

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GameHome() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-800 text-white p-4 pt-20">
      <img src="/icono.jpg" alt="Logo" className="w-20 h-20 mb-4 rounded-full" />
      <h1 className="text-4xl font-bold mb-8">Inicio del Juego de Educación Financiera</h1>
      <div className="flex space-x-4 mb-8">
        <Link href="/game">
          <a className="block px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700">Comenzar el Juego</a>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Salir
        </button>
      </div>
    </main>
  );
}
