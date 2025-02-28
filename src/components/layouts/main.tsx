import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import type { PropsWithChildren } from 'react';

import Profile from './profile';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: 'space-between', height: '64px' }}>
          <Typography component="div" variant="h6">
            Movie Datebase
          </Typography>
          <Profile />
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        margin="0 auto"
        minHeight="100vh"
        paddingBottom="64px"
        paddingTop="64px"
      >
        {children}
      </Box>
    </>
  );
};

export default MainLayout;
