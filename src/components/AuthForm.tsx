// src/components/AuthForm.tsx
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn, FaEye, FaEyeSlash } from 'react-icons/fa';

const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignIn = async () => {
    try {
      const result = await signIn('credentials', { redirect: false, email, password });
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Sign in successful');
        window.location.href = '/';
      }
    } catch (error) {
      toast.error('An error occurred during sign in');
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }

      const data = await response.json();
      toast.success('Registration successful');
      await handleSignIn();
    } catch (error) {
      toast.error('Error signing up');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
      <ToastContainer />
      <motion.div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <motion.div>
          <h1 className="text-3xl font-bold mb-6 text-center">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
          <div className="flex justify-center space-x-4 mb-4">
            <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} href="#" className="text-gray-500"><FaGooglePlusG size={28} /></motion.a>
            <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} href="#" className="text-gray-500"><FaFacebookF size={28} /></motion.a>
            <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} href="#" className="text-gray-500"><FaGithub size={28} /></motion.a>
            <motion.a whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} href="#" className="text-gray-500"><FaLinkedinIn size={28} /></motion.a>
          </div>
          <span className="block text-center text-gray-500 mb-4">or use your email for {isSignUp ? 'registration' : 'login'}</span>
          {isSignUp && (
            <motion.input type="text" placeholder="Name" className="w-full mb-3 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              value={name} onChange={(e) => setName(e.target.value)}
            />
          )}
          <div className="relative w-full mb-3">
            <motion.input type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative w-full mb-3">
            <motion.input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-200" onClick={toggleShowPassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {isSignUp && (
            <div className="relative w-full mb-3">
              <motion.input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="button" className="absolute right-3 top-3 text-gray-400 hover:text-gray-200" onClick={toggleShowConfirmPassword}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          )}
          <motion.button onClick={isSignUp ? handleSignUp : handleSignIn} className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </motion.button>
          <motion.button onClick={toggleForm} className="w-full mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300">
            {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
