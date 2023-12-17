import React from 'react';
import NavBar from './components/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <NavBar/>
        </ThemeProvider>
    );
};

export default App;
