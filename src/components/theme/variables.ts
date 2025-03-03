'use client';

import { red } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#E50914',
      },
      secondary: {
        main: '#221F1F',
      },
      background: {
        default: '#141414',
        paper: '#221F1F',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#B3B3B3',
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Arial', sans-serif",
      h1: { fontSize: '3rem', fontWeight: 700 },
      h2: { fontSize: '2.5rem', fontWeight: 700 },
      h3: { fontSize: '2rem', fontWeight: 600 },
      body1: { fontSize: '1rem', color: '#E5E5E5' },
      button: {
        textTransform: 'none',
        fontWeight: 'bold',
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: ({ ownerState, theme }) => ({
            backgroundColor: '#1F1F1F',
            backgroundImage: 'initial',
          }),
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
        },
      
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiIconButton: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiLink: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            return {
              textDecoration: 'none',
            };
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            return {
              '&:last-child': {
                paddingBottom: '16px',
              },
            };
          },
        },
      },
    },
  })
);

export default theme;
