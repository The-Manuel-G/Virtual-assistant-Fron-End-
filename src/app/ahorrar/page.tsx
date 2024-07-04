import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-4 animate-bounce">Calculadora de Ahorro</h1>
      <Link href="/form">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-blue-700">
          Empezar
        </button>
      </Link>
    </div>
  );
}
