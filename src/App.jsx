import { Box, Button, HStack, Stack, Switch, VStack } from "@chakra-ui/react";
import ThemeSwitcher from "./components/buttons/theme-button/ThemeSwitcher";
import CustomButton from "./components/buttons/button/CustomButton";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/header/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/auth.slice";
import useAuthFromUrl from "./hooks/useAuthFromUrl";


function App() {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.data)
  const navigate = useNavigate()
  useAuthFromUrl()

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<Profile />} path="/profile" />
        </Route>
      </Routes>

    </>

  )
}

export default App;
