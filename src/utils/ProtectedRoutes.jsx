import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet,Navigate } from "react-router-dom"

const ProtectedRoutes = () => {  
  const token = window.localStorage.getItem("token");



  return token ? <Outlet/> : <Navigate to={'/login'}/>}

export default ProtectedRoutes