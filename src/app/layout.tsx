"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { FaBars, FaTimes } from 'react-icons/fa';


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <html lang="en" className={inter.className}>
      <body>
        <Navbar className="navbar fixed-navbar">
          <NavbarBrand className="navbar-brand" >
            <AcmeLogo />
            <Link href="/" className="font-bold text-inherit">
              Financial
            </Link>
          </NavbarBrand>
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className={`navbar-content-wrapper ${isMenuOpen ? 'open' : ''}`}>
            <NavbarContent className="navbar-content center-content">
              <NavbarItem className="navbar-item">
                <Link color="foreground" href="/ahorrar">
                  Ahorrar 
                </Link>
              </NavbarItem>
              <NavbarItem className="navbar-item dropdown">
                <Link color="foreground" href="#" onClick={toggleDropdown}>
                  Explorar mercados
                </Link>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    <Link href="/crypto">Cryptos</Link>
                    <Link href="/stock">Stock</Link>
                    <Link href="/noticias">Noticias</Link>
                  </div>
                )}
              </NavbarItem>
              <NavbarItem className="navbar-item" isActive>
                <Link href="/" aria-current="page">
                  Home
                </Link>
              </NavbarItem>
              <NavbarItem className="navbar-item">
                <Link color="foreground" href="/game">
                  Jugar
                </Link>
              </NavbarItem>
              <NavbarItem className="navbar-item">
                <Link color="foreground" href="/quienes">
                  Quienes somos
                </Link>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent className="navbar-content end-content">
              <NavbarItem className="navbar-item">
                <Link href="#">Login</Link>
              </NavbarItem>
              <NavbarItem className="navbar-item">
                <Button as={Link} color="primary" href="#" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem>
            </NavbarContent>
          </div>
        </Navbar>
        <main className="main-content">
          {children}
        </main>
        <footer className='footer'>
          <p>© 2024 Financial Mentor</p>
          <p>Hecho con amor por </p>
        </footer>
      </body>
    </html>
  );
}
