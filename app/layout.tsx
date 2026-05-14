import './global.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.getdory.dev'),
  title: {
    default: 'Dory Docs',
    template: '%s | Dory Docs'
  },
  description:
    'Documentation for Dory, the AI-native data workspace for modern databases.',
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className="dory-shell flex min-h-screen flex-col font-[family-name:'IBM_Plex_Sans','Segoe_UI',sans-serif]">
        {children}
      </body>
    </html>
  );
}
