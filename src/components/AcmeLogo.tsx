import React from "react";
import Image from 'next/image';
const iconPath = '/icono.jpg';

export const AcmeLogo = () => (
  <div className="logo-container">
    <Image src={iconPath} alt="Logo" width={50} height={50} className="rounded-logo" />
  </div>
);
