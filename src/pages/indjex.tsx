// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to My Next.js App</h1>
      <nav className="flex justify-center space-x-4">
        <Link href="/stocks">
          <a className="text-xl font-medium text-blue-500 hover:underline">Stock Data</a>
        </Link>
        <Link href="/crypto">
          <a className="text-xl font-medium text-blue-500 hover:underline">Crypto Data</a>
        </Link>
      </nav>
    </div>
  );
}
