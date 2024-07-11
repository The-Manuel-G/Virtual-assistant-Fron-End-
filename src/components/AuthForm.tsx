//src/components/AuthForm.tsx
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn, FaEye, FaEyeSlash } from 'react-icons/fa';
import { supabase } from '../utils/supabase/client';
import { validateEmail, validatePassword } from '../utils/validation'; // Asegúrate de que estas funciones estén definidas

const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignIn = async () => {
    if (!validateEmail(formData.email) || !formData.password) {
      toast.error('Please enter a valid email and password.');
      return;
    }
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      toast.success('Sign in successful');
      window.location.href = '/';  // Consider using a router for navigation
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSignUp = async () => {
    if (!validateEmail(formData.email) || !validatePassword(formData.password) || !formData.name) {
      toast.error('Please ensure all fields are valid.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      toast.success('Registration successful');
      await handleSignIn();  // Consider managing user state in a global context or via Redux
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
      <ToastContainer />
      <motion.div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-8">
        <motion.div>
          <h1 className="text-3xl font-bold mb-6 text-center">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
          <div className="flex justify-center space-x-4 mb-4">
            {/* Implement actual authentication methods for social media or remove if not used */}
          </div>
          <span className="block text-center text-gray-500 mb-4">or use your email for {isSignUp ? 'registration' : 'login'}</span>
          {isSignUp && (
            <motion.input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="w-full mb-3 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" />
          )}
          <motion.input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full mb-3 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" />
          <motion.input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} className="w-full mb-3 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" />
          <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-200">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {isSignUp && (
            <>
              <motion.input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} className="w-full mb-3 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white" />
              <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-200">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </>
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
