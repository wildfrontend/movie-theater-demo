import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import '@pigment-css/react/styles.css';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import React from 'react';

import MainLayout from '@/components/layouts/main';
import ReactQueryProvider from '@/components/react-query/provider';
import MuiThemeProvider from '@/components/theme';
import WebVitals from '@/components/web-vitals';

export const metadata: Metadata = {
  title: 'The Movie Datebase',
  description: 'Interview demo',
};

const RootLayout: React.FC<PropsWithChildren<{ modal: React.ReactNode }>> = ({
  children,
  modal,
}) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <WebVitals />
        <ReactQueryProvider>
          <AppRouterCacheProvider>
            <MuiThemeProvider>
              <MainLayout>{children}</MainLayout>
              {modal}
            </MuiThemeProvider>
          </AppRouterCacheProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
