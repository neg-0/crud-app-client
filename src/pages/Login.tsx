import { Alert, Box, Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuthentication";


export default function Login() {

  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    clearError();
  }, [clearError]);

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
      });
  }

  return (<>
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Login</h1>
      <Box component="form" noValidate autoComplete="on"
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}
        onSubmit={handleLogin}
      >
        <TextField id="username-input" label="Username" name="username" sx={{ mt: 3, mb: 2 }} required />
        <TextField id="password-input" type="password" name="password" label="Password" sx={{ mt: 3, mb: 2 }} required />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3, mb: 2 }}>Login</Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Box>
  </>)
}