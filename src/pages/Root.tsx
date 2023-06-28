import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import MenuBar from '../components/MenuBar'

export default function Root() {
  return (
    <>
      <Box sx={{ width: '100vw' }}><MenuBar /></Box>
      <Box sx={{ width: '100vw', height: 'calc(100vh - 70px)' }}><Outlet /></Box>
    </>
  )
}