import { Close, Send } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useValue } from "../../context/ContextProvider";
import Password from "./Password";
import GoogleAuth from "./GoogleAuth";
import { register } from "../../actions/user";

const Login = () => {
  // State Tracker
  const {
    state: { openLogin },
    dispatch,
  } = useValue();

  // Switch between register and login text
  const [title, setTitle] = useState("Login");

  // Controls whether in register or login mode: default login
  const [isRegister, setIsRegister] = useState(false);

  // Reducer Close Login
  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  // Login Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // send login if not register
    const name = nameRef.current.value;
    const confirmPassword = confirmPassRef.current.value;

    if (password !== confirmPassword) {
      return dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Password does not match",
        },
      });
    }
    // register request
    register({ name, email, password }, dispatch);
  };

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();

  useEffect(() => {
    isRegister ? setTitle("Register") : setTitle("Login");
  }, [isRegister]);

  return (
    <Dialog open={openLogin} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>Please enter login info:</DialogContentText>
          {isRegister && (
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="text"
            fullWidth
            inputRef={emailRef}
            required
          />
          <Password {...{ passwordRef }} />
          {isRegister && (
            <Password
              passwordRef={confirmPassRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions>
        {isRegister ? "Have an account?" : "Don't have one?"}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Login" : "Register"}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: "center", py: "24px" }}>
        <GoogleAuth />
      </DialogActions>
    </Dialog>
  );
};

export default Login;
