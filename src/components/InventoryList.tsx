import { Button, Stack, Switch, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { User, useAuth } from '../hooks/useAuthentication';

export type InventoryItemData = {
  id: number,
  item_name: string,
  description: string,
  quantity: number,
  user_id: number,
  user: User | null
}

const inventoryItemColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'item_name', headerName: 'Name', width: 300, renderCell: (params: GridRenderCellParams<InventoryItemData>) => (<Link to={`/viewItem/${params.row.id}`}>{params.value}</Link>) },
  { field: 'description', headerName: 'Description', width: 800 },
  { field: 'quantity', headerName: 'Quantity', width: 100 },
  { field: 'username', headerName: 'Owner Name', width: 200, valueGetter: (params) => `${params.row.user?.first_name} ${params.row.user?.last_name}` }
]

export default function InventoryList() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItemData[] | null>([]);
  const [displayAllItems, setDisplayAllItems] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    // Build the url based on display options
    const url = `http://localhost:3000/items?descLimit=100&addUserData=true&onlyMyItems=${!displayAllItems}`;

    axios.get(url)
      .then(res => {
        console.log(res)
        return res.data;
      })
      .then(data => setInventoryItems(data as InventoryItemData[]))
  }, [displayAllItems, user])

  if (!inventoryItems) return null;
  return (
    <>
      {user && (
        <Button variant="outlined" color="primary" onClick={() => setDisplayAllItems(!displayAllItems)} >
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography>Display My Items</Typography>
            <Switch checked={displayAllItems} />
            <Typography>Display All Items</Typography>
          </Stack>
        </Button>)}
      <DataGrid rows={inventoryItems} columns={inventoryItemColumns}
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'asc' }]
          }
        }}
        columnVisibilityModel={{
          username: (user !== null)
        }} />
    </>)

}