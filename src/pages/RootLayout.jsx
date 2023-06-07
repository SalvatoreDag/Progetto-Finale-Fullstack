import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/header/Header';


function RootLayout() {
  return (
   <>
     <Header />
     <Outlet />
   </>
  )
}

export default RootLayout