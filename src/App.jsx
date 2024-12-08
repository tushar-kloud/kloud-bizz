import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  Route,
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import './App.css'
import HomeScreen from './screens/HomeScreen';
import Navbar from './components/Navbar';
import DashboardScreen from './screens/DashboardScreen';
import LabScreen from './screens/LabScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import { PrivateRoutes } from './utils/securedRouting';

function Layout(){
  return (
    <div>
      <Navbar mode="light" />
      <Outlet />
    </div>
  )
}

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element={<HomeScreen/>} />
      <Route path='/signin' element={<LoginScreen/>} />
      
      {/* SECURED ROUTES */}
      <Route element={<PrivateRoutes/>}>
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/lab/:labId" element={<LabScreen />} />
      </Route>
    </Route>
  )
)

function App() {
  return (
  <RouterProvider router={router} />
  )
}

export default App
