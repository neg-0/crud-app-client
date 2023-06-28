import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuthentication";

export default function Profile() {

  const { user, changeUserData, changePassword } = useAuth();

  const [newPassword, setNewPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");

  const [userDataError, setUserDataError] = useState<string>("");
  const [userDataSuccess, setUserDataSuccess] = useState<null | string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordSuccess, setPasswordSuccess] = useState<null | string>("");

  const [editingUser, setEditingUser] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  useEffect(() => {
    if (!user)
      return;

    setUsername(user.username);
    setFirstName(user.first_name);
    setLastName(user.last_name);

  }, [user]);

  function handleUpdatePassword() {
    setPasswordSuccess(null);

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
        setPasswordSuccess("Password updated successfully");
      })
      .catch((err) => {
        setPasswordError(err.message);
      });
  }

  function handleChangeUserData() {
    setUserDataSuccess(null);
    changeUserData({
      first_name: firstName,
      last_name: lastName,
      username: username
    })
      .then((res) => {
        setFirstName(res.first_name);
        setLastName(res.last_name);
        setUsername(res.username);
        setEditingUser(false);
        setUserDataSuccess("User data updated successfully");
      })
      .catch((err) => {
        setUserDataError(err);
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
    <Stack component="form" spacing={2} sx={{ width: "50%", margin: "auto", py: 3 }} onSubmit={e => e.preventDefault()}>
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
          {userDataSuccess && <Alert severity="success">{userDataSuccess}</Alert>}
        </>
      }

      <Typography variant="h6">Change Password</Typography>
      <TextField type="password" autoComplete="new-password" label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <TextField type="password" autoComplete="new-password" label="Verify Password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
      <Stack direction="row" spacing={2} sx={{ width: "50%", margin: "auto" }}>
        <Button type="submit" variant="contained" onClick={handleUpdatePassword}>Change Password</Button>
      </Stack>

      {passwordError && <Alert severity="error">{passwordError}</Alert>}
      {passwordSuccess && <Alert severity="success">{passwordSuccess}</Alert>}
    </Stack></>)
}