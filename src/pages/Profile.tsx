import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthentication";

export default function Profile() {

  const { user, changeUserData, changePassword } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [userDataError, setUserDataError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [editingUser, setEditingUser] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (!user)
      return;

    setUsername(user.username);
    setFirstName(user.first_name);
    setLastName(user.last_name);

  }, [user]);

  function handleUpdatePassword() {
    // Verify password is not blank
    if (newPassword === "") {
      setPasswordError("Password cannot be blank");
      return;
    }

    // Verify the new password and verify password match
    if (newPassword !== verifyPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    changePassword(newPassword)
      .then(() => {
        setPasswordError("");
        setNewPassword("");
        setVerifyPassword("");
      })
      .catch((err) => {
        setPasswordError(err.message);
      });
  }

  function handleChangeUserData() {
    changeUserData({
      first_name: firstName,
      last_name: lastName,
      username: username
    })
      .then(() => {
        setFirstName("");
        setLastName("");
        setEditingUser(false);
      })
      .catch((err) => {
        console.log(err);
        setUserDataError(err.response.data.error);
      });
  }

  function handleCancelUserDataChanges() {
    if (!user)
      return;
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setUsername(user.username);
    setEditingUser(false);
  }

  if (!user) {
    return <></>
  }

  return (<>
    <Stack component="form" spacing={2} sx={{ width: "50%", margin: "auto", mt: 3 }}>
      <Typography variant="h4">{`${user.first_name} ${user.last_name}'s Profile`}</Typography>
      <TextField disabled={true} label="User ID" value={user.id} />
      <TextField disabled={!editingUser} label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <TextField disabled={!editingUser} label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <TextField autoComplete="username" disabled={!editingUser} label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

      {editingUser ? (
        <>
          <Alert severity="info">
            Editing User {user.username}
          </Alert>
          <Stack direction="row" spacing={2} sx={{ width: "50%", margin: "auto" }}>
            <Button type="submit" variant="contained" color="success" onClick={handleChangeUserData} >Save User</Button>
            <Button variant="contained" color="error" onClick={handleCancelUserDataChanges} >Cancel</Button>
          </Stack>
          {userDataError && <Alert severity="error">{userDataError}</Alert>}
        </>
      ) :
        <>
          <Stack direction="row" spacing={2} sx={{ width: "50%", margin: "auto" }}>
            <Button variant="contained" color="success" onClick={() => setEditingUser(true)} >Edit User</Button>
          </Stack>
        </>
      }

      <Typography variant="h6">Change Password</Typography>
      <TextField type="password" autoComplete="new-password" label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <TextField type="password" autoComplete="new-password" label="Verify Password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
      <Stack direction="row" spacing={2} sx={{ width: "50%", margin: "auto" }}>
        <Button type="submit" variant="contained" onClick={handleUpdatePassword}>Change Password</Button>
      </Stack>

      {passwordError && <Alert severity="error">{passwordError}</Alert>}
    </Stack></>)
}