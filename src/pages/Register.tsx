import { Box, Button, Stack, TextField, Typography } from "@mui/material";
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
      <Box component="form" noValidate autoComplete="on"
        onSubmit={handleRegister}
      >
        <Stack spacing={2} sx={{ width: "50%", margin: "auto", mt: 3, alignItems: "center" }}>
          <Typography variant="h2">Register</Typography>
          <TextField label="First Name" variant="outlined" name="first_name" />
          <TextField label="Last Name" variant="outlined" name="last_name" />
          <TextField label="Username" variant="outlined" name="username" />
          <TextField label="Password" variant="outlined" name="password" type="password" />
          <Button type="submit" variant="contained">Register</Button>
        </Stack>
      </Box>
    </>
  )
}