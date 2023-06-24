import { Box } from "@mui/material"
import { ReactNode } from "react"
import AuthenticationProvider from "../components/AuthenticationProvider"
import MenuBar from '../components/MenuBar'

type RootProps = {
  children?: ReactNode
}

export default function Root({ children }: RootProps) {
  return (
    <>
      <AuthenticationProvider>
        <Box sx={{ width: '100vw' }}><MenuBar /></Box>
        {children}
      </AuthenticationProvider>
    </>
  )
}