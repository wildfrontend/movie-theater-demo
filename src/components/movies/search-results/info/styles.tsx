import { Box, styled } from '@mui/material';

export const ScrollBox = styled(Box)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  ['&::-webkit-scrollbar']: {
    width: '8px',
    height: '8px',
  },
  ['&::-webkit-scrollbar-thumb']: {
    background: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '10px',
  },
  ['&::-webkit-scrollbar-track']: {
    background: 'rgba(0, 0, 0, 0)',
  },
}));
