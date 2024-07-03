// pages/_app.tsx
import type { AppProps } from 'next/app';
import RootLayout from '../app/layout';
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;
