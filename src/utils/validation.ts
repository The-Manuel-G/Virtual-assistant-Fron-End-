// utils/validation.ts

// Función para validar la dirección de correo electrónico
export function validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
  
  // Función para validar la fortaleza de la contraseña
  export function validatePassword(password: string): boolean {
    return password.length >= 6; // Ejemplo básico: validar que la contraseña tenga al menos 6 caracteres
  }
  