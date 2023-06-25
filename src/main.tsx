import CssBaseline from "@mui/material/CssBaseline"
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { ProvideAuthentication } from "./hooks/useAuthentication"
import './index.css'
import CreateItem from "./pages/CreateItem"
import Inventory from './pages/Inventory'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Root from './pages/Root'
import ViewItem from './pages/ViewItem'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Root />}>
        <Route path="/" element={<Inventory />} />
        <Route path="/create" element={<CreateItem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/viewItem/:item" element={<ViewItem />} />
      </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProvideAuthentication>
      <CssBaseline />
      <RouterProvider router={router} />
    </ProvideAuthentication>
  </React.StrictMode>,
)
