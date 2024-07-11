// src/pages/_app.tsx
import Navbar from "../components/Navbar";
import "../app/globals.css"; // Ruta corregida al archivo CSS
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>

    </>
  );
}

export default MyApp;
