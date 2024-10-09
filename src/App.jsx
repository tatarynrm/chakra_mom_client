import { Box, Button, HStack, Stack, Switch, useColorMode, VStack } from "@chakra-ui/react";
import ThemeSwitcher from "./components/buttons/theme-button/ThemeSwitcher";
import CustomButton from "./components/buttons/button/CustomButton";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/header/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAuthMe } from "./redux/slices/auth.slice";
import useAuthFromUrl from "./hooks/useAuthFromUrl";
import axios from "axios";
import Instagram from "./pages/Instagram/Instagram";


function App() {
  const token = localStorage.getItem('token')
  const user = useSelector(state => state.auth.data)
const {colorMode} = useColorMode()
  useAuthFromUrl()
  const [sum, setSum] = useState(1300);


  return (
    <Stack >
           
      <Navbar />
      <Routes>
        <Route path="/login" element={token && user ? <Navigate to="/" /> : <Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<Instagram />} path="/instagram" />
        </Route>
      </Routes>

    </Stack>

  )
}

export default App;
