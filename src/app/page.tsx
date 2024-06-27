// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Next.js App</h1>
      <nav className="space-y-4">
        <Link href="/stocks" className="text-xl font-medium text-blue-500 hover:underline">
          Stock Data
        </Link>
        <Link href="/crypto" className="text-xl font-medium text-blue-500 hover:underline">
          Crypto Data
        </Link>
      </nav>
    </main>
  );
}
