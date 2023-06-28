import { Box, Typography } from "@mui/material";
import InventoryList from "../components/InventoryList";

type InventoryProps = {
  onlyUsersItems?: boolean
}

export default function Inventory({ onlyUsersItems }: InventoryProps) {
  return (<>
    <Typography variant="h1" sx={{ ml: 6 }}>{onlyUsersItems ? 'My Items' : 'All Items'}</Typography>
    <Box sx={{ height: 'calc(100vh - 200px)', overflowY: 'auto', width: 'calc(100% - 16px)', pl: 2 }}>
      <InventoryList onlyUsersItems={onlyUsersItems} />
    </Box>
  </>)
}