import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InventoryItemData } from "../components/InventoryList";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export default function ViewItem() {

  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<InventoryItemData | null>(null);
  const [itemName, setItemName] = useState<string>("");
  const [editingItem, setEditingItem] = useState<boolean>(false);
  const [deletingItem, setDeletingItem] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get(`/items/${itemId}`)
      .then(res => {
        setItem(res.data);
        setItemName(res.data.item_name);
      }).catch(err => {
        setError(err.response.data.message);
        console.log(err);
      });
  }, [itemId]);

  function handleEditItem() {
    setEditingItem(true);
  }

  function handleSaveItem() {
    api.put(`/items/${itemId}`, item)
      .then(res => {
        console.log(res);
        setItem(res.data);
        setItemName(res.data.item_name);
        setEditingItem(false);
      }).catch(err => {
        setError(err.response.data.message);
        console.log(err);
      });
  }

  function handleDeleteItem() {
    api.delete(`/items/${itemId}`)
      .then(res => {
        console.log(res);
        // Navigate to the home page
        navigate("/");
      }).catch(err => {
        setError(err.response.data.message);
        console.log(err);
      });
  }


  if (!item) return (<>Loading...</>)

  return (<>
    <Stack spacing={2} sx={{ width: "50%", margin: "auto", mt: 3 }}>
      <Typography variant="h4">{itemName}</Typography>
      <TextField disabled={true} label="Item ID" value={item.id} />
      <TextField disabled={!editingItem} label="Item Name" value={item.item_name} onChange={(e) => setItem({ ...item, item_name: e.target.value })} />
      <TextField disabled={!editingItem} label="Item Description" value={item.description} onChange={(e) => setItem({ ...item, description: e.target.value })} />
      <TextField disabled={!editingItem} label="Item Quantity" value={item.quantity} type="number" onChange={(e) => setItem({ ...item, quantity: parseInt(e.target.value) })} />

      {item.user && (
        <>
          <TextField disabled={true} label="Item Owner User ID" value={item.user.id} />
          <TextField disabled={true} label="Item Owner User Name" value={item.user.first_name + " " + item?.user?.last_name} />
        </>
      )}

      {editingItem && (
        <>
          <Alert severity="info">
            Editing Item {itemName}
          </Alert>
          <Stack direction="row" spacing={2} sx={{ width: "50%", margin: "auto" }}>
            <Button variant="contained" color="success" onClick={handleSaveItem} >Save Item</Button>
            <Button variant="contained" color="error" onClick={() => setEditingItem(false)} >Cancel</Button>
          </Stack>
        </>
      )}

      {deletingItem && (
        <>
          <Alert severity="error">
            Are you sure you want to delete item {itemName}
          </Alert>
          <Stack direction="row" spacing={2} sx={{ width: "50%", margin: "auto" }}>
            <Button variant="contained" color="error" onClick={handleDeleteItem} >Confirm Delete</Button>
            <Button variant="contained" color="success" onClick={() => setDeletingItem(false)} >Cancel</Button>
          </Stack>
        </>)}

      {!editingItem && !deletingItem && (
        <>
          <Stack direction="row" spacing={2} sx={{ width: "50%", margin: "auto" }}>
            <Button variant="contained" color="success" onClick={handleEditItem} >Edit Item</Button>
            <Button variant="contained" color="error" onClick={() => setDeletingItem(true)} >Delete Item</Button>
          </Stack>
        </>
      )}

      {error && (
        <Alert severity="error">
          {error}
        </Alert>)}
    </Stack>
  </>)
}