import '@mui/material/styles';

/**
 * ANCHOR Button
 * refer https://github.com/mui/material-ui/issues/36273QD
 */

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    circle: true;
  }
}
