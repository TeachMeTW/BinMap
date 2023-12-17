import React from 'react'
import {AppBar, Container, Toolbar, Box, IconButton, Typography} from '@mui/material'
import {Menu} from '@mui/icons-material'

const NavBar = () => {
  return (

    /* AppBar from Material UI */
    <AppBar>
        {/* Containter from Material UI stores the individual Nav Components*/}
        <Container maxWidth='lg'>
            {/* DisableGutters removes padding */}
            <Toolbar disableGutters>
                {/* Box with margin from right */}
                <Box sx={{mr:1}}>
                    {/* Menu Icon */}
                    <IconButton size='large' color='inherit'>
                        <Menu />
                    </IconButton>
                </Box>
                {/* Typography Logo/Text, Can be turned into an Icon*/}
                <Typography
                variant='h6'
                component='h1'
                noWrap
                sx={{flexGrow:1, display:{xs:'none', md:'flex'}}}
                >
                    BinMap
                </Typography>

                {/* For smaller screens*/}
                <Typography
                variant='h6'
                component='h1'
                noWrap
                sx={{flexGrow:1, display:{xs:'flex', md:'none'}}}
                >
                    BM
                </Typography>
            </Toolbar>
        </Container>

    </AppBar>
  )
}

export default NavBar