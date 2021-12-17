import React from 'react';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';


import { useAuth } from '../context/AuthContex';

const TheHeader = () => {
  const {user} = useAuth()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {user &&  ( <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>) }
    
          <Typography variant="h4"  sx={{ flexGrow: 1 }} align="center">
            Bball
          </Typography>
          
            <Avatar src={user.avatar}  >
               
            </Avatar>
          
       
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TheHeader;
