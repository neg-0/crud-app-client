import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthentication";

export default function Login() {

  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string },
      password: { value: string }
    }
    const username = target.username.value;
    const password = target.password.value;
    login(username, password)
      // Then navigate to the home page
      .then(() => {
        navigate("/");
      }).catch(err => {
        setLoginError(err);
      });
  }

  return (<>
    <Box component="form" noValidate autoComplete="on"
      onSubmit={handleLogin}
    >
      <Stack spacing={2} sx={{ width: "50%", margin: "auto", mt: 3, alignItems: "center" }}>
        <Typography variant="h2">Login</Typography>
        <TextField id="username-input" label="Username" name="username" required />
        <TextField id="password-input" type="password" name="password" label="Password" required />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3, mb: 2 }}>Login</Button>
        {loginError && <Alert severity="error">{loginError}</Alert>}
      </Stack>
    </Box>
  </>)
}