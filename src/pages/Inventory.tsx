import { Box, Typography } from "@mui/material";
import InventoryList from "../components/InventoryList";

export default function Inventory() {
  return (<>
    <Typography variant="h1">Inventory</Typography>
    <Box sx={{ height: '75vh', width: 'calc(100% - 16px)' }}>
      <InventoryList />
    </Box>
  </>)
}