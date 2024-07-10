//app/layout.tsx 
"use client";



import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    //<SessionProvider>
      <html lang="en" className={inter.className}>
        <body>
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <footer className='footer'>
            <p>© 2024 Financial Mentor</p>
            <p>Hecho con amor por</p>
          </footer>
          <ToastContainer />
        </body>
      </html>
    //</SessionProvider>
  );
}
