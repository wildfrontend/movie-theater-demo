import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import React from 'react';

import logoCover from '@/assets/logo/conver.png';
import MainLayout from '@/components/layouts/main';
import ReactQueryProvider from '@/components/react-query/provider';
import MuiThemeProvider from '@/components/theme';

export const metadata: Metadata = {
  metadataBase: new URL('https://movie-theater-demo.vercel.app'),
  title: {
    template: 'The Movie Database - %s',
    default: 'The Movie Database - Explore the World of Movies',
  },
  description:
    'Discover comprehensive movie information, reviews, and details on your favorite films.',
  openGraph: {
    images: {
      url: logoCover.src,
    },
  },
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
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
