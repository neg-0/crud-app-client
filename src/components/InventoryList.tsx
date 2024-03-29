import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { User, useAuth } from '../hooks/useAuthentication';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export type InventoryItemData = {
  id?: number,
  item_name: string,
  description: string,
  quantity: number,
  user_id?: number,
  user?: User | null
}

const inventoryItemColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'item_name', headerName: 'Name', width: 300, renderCell: (params: GridRenderCellParams<InventoryItemData>) => (<Link to={`/viewItem/${params.row.id}`}>{params.value}</Link>) },
  { field: 'quantity', headerName: 'Quantity', width: 100 },
  { field: 'username', headerName: 'Owner Name', width: 200, valueGetter: (params) => `${params.row.user?.first_name} ${params.row.user?.last_name}` },
  { field: 'description', headerName: 'Description', width: 800 },
]

type InventoryListProps = {
  onlyUsersItems?: boolean
}

export default function InventoryList({ onlyUsersItems = false }: InventoryListProps) {
  const [inventoryItems, setInventoryItems] = useState<InventoryItemData[] | null>([]);

  const { user } = useAuth();

  useEffect(() => {
    // Build the url based on display options
    let url = "";
    if (onlyUsersItems) {
      url = `/my_items?descLimit=100`;
    } else {
      url = `/items?descLimit=100`;
    }

    api.get(url)
      .then(res => {
        console.log(res)
        return res.data;
      })
      .then(data => setInventoryItems(data as InventoryItemData[]))
  }, [onlyUsersItems, user])

  if (!inventoryItems) return null;
  return (
    <>
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