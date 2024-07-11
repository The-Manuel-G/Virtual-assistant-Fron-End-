import React from "react";
import Image from 'next/image';

const iconPath = '/icono.jpg';  // Asegúrate de que el archivo exista en la carpeta public de tu proyecto

export const AcmeLogo = () => (
  <div className="logo-container">
    <Image src={iconPath} alt="Logo" width={50} height={50} className="rounded-logo" />
  </div>
);

// No olvides agregar algunos estilos si es necesario, por ejemplo:
// .logo-container { display: flex; justify-content: center; align-items: center; }
// .rounded-logo { border-radius: 50%; } // Si quieres que el logo sea redondo
