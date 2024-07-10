//src/components/Navbar.tsx
"use client";



import React, { useState } from 'react';
import { Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import { FaBars, FaTimes } from 'react-icons/fa';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = (path: string) => {
    if (!session) {
      router.push('/login');
    } else {
      router.push(path);
    }
  };

  return (
    <NextUINavbar className="navbar fixed-navbar">
      <NavbarBrand className="navbar-brand">
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
            <a onClick={() => handleLinkClick("/ahorrar")} className="cursor-pointer">
              Ahorrar
            </a>
          </NavbarItem>
          <NavbarItem className="navbar-item dropdown">
            <a className="cursor-pointer" onClick={toggleDropdown}>
              Explorar mercados
            </a>
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
            <a onClick={() => handleLinkClick("/game/inicio")} className="cursor-pointer">
              Jugar
            </a>
          </NavbarItem>
          <NavbarItem className="navbar-item">
            <Link color="foreground" href="/quienes">
              Quienes somos
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="navbar-content end-content">
          {session ? (
            <>
              <NavbarItem className="navbar-item">
                <span>Bienvenido, {session.user?.name}</span>
              </NavbarItem>
              <NavbarItem className="navbar-item">
                <Button onClick={() => signOut()} color="primary" variant="flat">
                  Logout
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem className="navbar-item">
                <Link href="/login">Login</Link>
              </NavbarItem>
              <NavbarItem className="navbar-item">
                <Button as={Link} color="primary" href="/signup" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </div>
    </NextUINavbar>
  );
};

export default Navbar;
