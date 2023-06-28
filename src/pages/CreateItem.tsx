import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InventoryItemData } from "../components/InventoryList";
import { useAuth } from "../hooks/useAuthentication";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export default function CreateItem() {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [item, setItem] = useState<InventoryItemData>({
    item_name: "",
    description: "",
    quantity: 0
  } as InventoryItemData);

  const [error, setError] = useState<string | null>(null);

  function handleCreateItem() {
    // Verify the user is valid
    if (!user) {
      navigate("/login");
      return;
    }

    setError(null);

    api.post(`/items`, item)
      .then(res => {
        console.log(res);
        navigate("/myItems");
      }).catch(err => {
        setError(err.response.data.error);
      });
  }

  function handleCancelCreateItem() {
    navigate("/myItems");
  }

  return (<>
    <Stack spacing={2} sx={{ width: "50%", margin: "auto", py: 3 }}>
      <Typography variant="h4">Creating new item: {item.item_name}</Typography>
      <TextField label="Item Name" value={item.item_name} onChange={(e) => setItem({ ...item, item_name: e.target.value })} />
      <TextField label="Item Description" multiline value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} />
      <TextField label="Item Quantity" value={item.quantity} type="number" onChange={(e) => setItem({ ...item, quantity: parseInt(e.target.value) })} />

      <Stack direction="row" spacing={2} sx={{ width: "50%", margin: "auto" }}>
        <Button variant="contained" color="success" onClick={handleCreateItem} >Create Item</Button>
        <Button variant="contained" color="error" onClick={handleCancelCreateItem} >Cancel</Button>
      </Stack>

      {error && (
        <Alert severity="error">
          {error}
        </Alert>)}
    </Stack>
  </>)
}