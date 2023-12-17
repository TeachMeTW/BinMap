// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#76d275', // Light green
      main: '#43a047',  // Primary green
      dark: '#00701a',  // Dark green
      contrastText: '#fff',
    },
  },
});

export default theme;
