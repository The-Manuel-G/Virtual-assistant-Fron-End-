"use client";

export default function ErrorPage({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div>
        <h1 className="text-3xl font-bold mb-4">Authentication Error</h1>
        <p className="mb-4">{error || "An error occurred during authentication."}</p>
        <a href="/login" className="text-blue-500">Go to Login</a>
      </div>
    </div>
  );
}
