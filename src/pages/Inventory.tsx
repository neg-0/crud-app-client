import { Box, Typography } from "@mui/material";
import InventoryList from "../components/InventoryList";

type InventoryProps = {
  onlyUsersItems?: boolean
}

export default function Inventory({ onlyUsersItems }: InventoryProps) {
  return (<>
    <Typography variant="h1" >Inventory</Typography>
    <Box sx={{ height: '75vh', width: 'calc(100% - 16px)' }}>
      <InventoryList onlyUsersItems={onlyUsersItems} />
    </Box>
  </>)
}