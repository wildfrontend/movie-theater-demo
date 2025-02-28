import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import '@pigment-css/react/styles.css';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import MainLayout from '@/components/layouts/main';
import ReactQueryProvider from '@/components/react-query/provider';
import MuiThemeProvider from '@/components/theme';

export const metadata: Metadata = {
  title: 'The Movie Datebase',
  description: 'Inter demo',
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <AppRouterCacheProvider>
            <MuiThemeProvider>
              <MainLayout>{children}</MainLayout>
            </MuiThemeProvider>
          </AppRouterCacheProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
