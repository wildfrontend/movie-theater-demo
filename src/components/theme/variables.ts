'use client';



import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
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
