import React from 'react';
import NavBar from './components/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';
import Login from './components/user/Login';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Login/>
            <NavBar/>
        </ThemeProvider>
    );
};

export default App;
