// app/login/page.tsx
"use client";

import AuthForm from '../../components/AuthForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <AuthForm />
    </div>
  );
}
