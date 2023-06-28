import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InventoryItemData } from "../components/InventoryList";
import { useAuth } from "../hooks/useAuthentication";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export default function ViewItem() {

  const { user } = useAuth();
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState<InventoryItemData>({} as InventoryItemData);
  const [editableItem, setEditableItem] = useState<InventoryItemData>({} as InventoryItemData);

  const [editingItem, setEditingItem] = useState<boolean>(false);
  const [deletingItem, setDeletingItem] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    api.get(`/items/${itemId}`)
      .then(res => {
        setItem(res.data);
      }).catch(err => {
        setError(err.response.data.error);
        console.log(err);
      });
  }, [itemId]);

  useEffect(() => {
    // Any time the item updates, automatically clone the editable item
    setEditableItem({ ...item } as InventoryItemData);
  }, [item]);

  function handleEditItem() {
    setEditingItem(true);
  }

  function handleCancelEditItem() {
    setError(null);
    setEditableItem({ ...item } as InventoryItemData);
    setEditingItem(false);
  }

  function handleSaveItem() {
    setError(null);
    api.put(`/items/${itemId}`, editableItem)
      .then(res => {
        console.log(res);
        setItem(res.data);
        setEditingItem(false);
      }).catch(err => {
        setError(err.response.data.error);
        console.log(err);
      });
  }

  function handleDeleteItem() {
    setError(null);
    api.delete(`/items/${itemId}`)
      .then(res => {
        console.log(res);
        // Navigate to their items
        navigate("/myItems");
      }).catch(err => {
        setError(err.response.data.error);
        console.log(err);
      });
  }

  if (!item.id || !editableItem.id) return (<>Loading...</>)

  return (<>
    <Stack spacing={2} sx={{ width: "50%", margin: "auto", py: 3 }}>
      <Typography variant="h4">{item.item_name}</Typography>
      <TextField disabled={true} label="Item ID" value={item.id} />
      <TextField disabled={!editingItem} label="Item Name" value={editableItem.item_name} onChange={(e) => setEditableItem({ ...editableItem, item_name: e.target.value })} />
      <TextField disabled={!editingItem} label="Item Description" multiline value={editableItem.description} onChange={(e) => setEditableItem({ ...editableItem, description: e.target.value })} />
      <TextField disabled={!editingItem} label="Item Quantity" value={editableItem.quantity} type="number" onChange={(e) => setEditableItem({ ...editableItem, quantity: parseInt(e.target.value) })} />

      {item.user && (
        <>
          <TextField disabled={true} label="Item Owner User Name" value={item.user.first_name + " " + item?.user?.last_name} />
        </>
      )}

      {editingItem && (
        <>
          <Alert severity="info">
            Editing Item {item.item_name}
          </Alert>
          <Stack direction="row" spacing={2} sx={{ width: "50%", margin: "auto" }}>
            <Button variant="contained" color="success" onClick={handleSaveItem} >Save Item</Button>
            <Button variant="contained" color="error" onClick={handleCancelEditItem} >Cancel</Button>
          </Stack>
        </>
      )}

      {deletingItem && (
        <>
          <Alert severity="error">
            Are you sure you want to delete item {item.item_name}
          </Alert>
          <Stack direction="row" spacing={2} sx={{ width: "50%", margin: "auto" }}>
            <Button variant="contained" color="error" onClick={handleDeleteItem} >Confirm Delete</Button>
            <Button variant="contained" color="success" onClick={() => setDeletingItem(false)} >Cancel</Button>
          </Stack>
        </>)}

      {user && !editingItem && !deletingItem && (
        <>
          <Stack direction="row" spacing={2} sx={{ margin: "auto" }}>
            <Button variant="contained" disabled={user.id !== item.user_id} color="success" onClick={handleEditItem} >Edit Item</Button>
            <Button variant="contained" disabled={user.id !== item.user_id} color="error" onClick={() => setDeletingItem(true)} >Delete Item</Button>
            {user.id !== item.user_id && <Alert severity="info"> You may only edit and delete you own items.</Alert>}
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