import type { ReactNode } from 'react';
import type { Metadata } from "next";
import './globals.css';
import ClientLoadingWrapper from '@/components/ClientLoadingWrapper'

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html>
      <body>
        <ClientLoadingWrapper>
          {children}
        </ClientLoadingWrapper>
      </body>
    </html>
  );
}
