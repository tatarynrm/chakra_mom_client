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


function App() {
  const token = localStorage.getItem('token')
  const user = useSelector(state => state.auth.data)
const {colorMode} = useColorMode()
  useAuthFromUrl()
  const [sum, setSum] = useState(1300);

  const [media, setMedia] = useState([]);

  const handleLogin = () => {
      // window.location.href = 'http://localhost:8800/auth/instagram';
      window.location.href = 'https://api.logistic-mira.space/auth/instagram';
  };

  const fetchMedia = async () => {
      try {
          // const response = await axios.get('http://localhost:8800/manage', { withCredentials: true });
          const response = await axios.get('https://api.logistic-mira.space/manage', { withCredentials: true });
         
         console.log(response.data.data);
         
          setMedia(response.data.data);
      } catch (error) {
          console.error('Error fetching media:', error);
      }
  };

  useEffect(() => {
      fetchMedia();
  }, []);

  return (
    <Stack >
           <button onClick={handleLogin}>Login with Instagram</button>
      <Navbar />
      <Routes>
        <Route path="/login" element={token && user ? <Navigate to="/" /> : <Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />} path="/" />
          <Route element={<Profile />} path="/profile" />
        </Route>
      </Routes>

    </Stack>

  )
}

export default App;
