import { Box } from '@mui/material';
import './App.css';
import InventoryList from './components/InventoryList';
import MenuBar from './components/MenuBar';

function App() {

  return (
    <>
    <nav><MenuBar/></nav>
    <Box>
      <InventoryList/>
    </Box>
    </>
  )
}

export default App
