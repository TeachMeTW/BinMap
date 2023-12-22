import React from 'react';
import NavBar from './components/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';
import Login from './components/user/Login';
import Notif from './components/Notif';
import Loading from './components/Loading';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Loading/>
            <Notif/>
            <Login/>
            <NavBar/>
        </ThemeProvider>
    );
};

export default App;
