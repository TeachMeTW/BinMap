



import { Google } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useValue } from '../../context/ContextProvider'
import { jwtDecode } from 'jwt-decode';

const GoogleAuth = () => {
  const {dispatch} = useValue()
  const [disabled, setDisabled] = useState(false)
  const handleResponse = (response) => {
    const token = response.credential
    const decodedToken = jwtDecode(token)
    
    const {sub:id, email, name, picture:photoURL} = decodedToken
    dispatch({
      type:'UPDATE_USER',
      payload: {id, email, name, photoURL, token, google: true},
    });
    dispatch({type:'CLOSE_LOGIN'})
  }
  const handleGoogle = () => {
    setDisabled(true)
    try {
      console.log(process.env.REACT_APP_CLIENT_ID);
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_CLIENT_ID, // Use REACT_APP_CLIENT_ID instead of CLIENT_ID
        callback: handleResponse
      });      
      window.google.accounts.id.prompt((notification) => {
        if(notification.isNotDisplayed()) {
          throw new Error('Try again later')
        }
        if(notification.isSkippedMoment() || notification.isDismissedMoment()) {
          setDisabled(false)
        }
      })
    } 
    catch (error) {
      dispatch({type:'UPDATE_ALERT', payload:{open:true, severity:'error', message:error.message}})
      console.log(error)
    }
  }


  return (
    <Button
    variant='outlined'
    startIcon={<Google/>}
    disabled={disabled}
    onClick={handleGoogle}
    >
        Login with Google
    </Button>
  )
}

export default GoogleAuth