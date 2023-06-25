import { Box, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuthentication";

export default function Register() {

  const { register, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, [clearError]);

  function handleRegister(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      first_name: { value: string },
      last_name: { value: string },
      username: { value: string },
      password: { value: string },
    }

    const first_name = target.first_name.value;
    const last_name = target.last_name.value;
    const username = target.username.value;
    const password = target.password.value;

    register(username, password, first_name, last_name)
      .then(() => {
        // Redirect to the home page
        window.location.href = "/";
      });
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Register</h1>
        <Box component="form" noValidate autoComplete="on"
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}
          onSubmit={handleRegister}
        >
          <TextField label="First Name" variant="outlined" name="first_name" />
          <TextField label="Last Name" variant="outlined" name="last_name" />
          <TextField label="Username" variant="outlined" name="username" />
          <TextField label="Password" variant="outlined" name="password" type="password" />
          <Button type="submit" variant="contained">Register</Button>
        </Box>
      </Box>
    </>
  )
}