import './globals.css';
import type { Metadata } from 'next';
import { GlobalListProvider } from './context/global-list'
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PP',
  description: 'Propostas de portais',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GlobalListProvider>
        <body className={inter.className}>{children}</body>
      </GlobalListProvider>
    </html>
  );
}
