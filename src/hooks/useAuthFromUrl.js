import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAuthMe, loginUserWithGoogle } from '../redux/slices/auth.slice';


const useAuthFromUrl = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const token = localStorage.getItem('token')
  useEffect(() => {
    // Отримуємо дані з URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const id = params.get('id');
    const email = params.get('email');
    const name = params.get('name');
    const google_id = params.get('google_id');


    if (token && id && email && name && google_id) {
      // Зберігаємо токен у localStorage

      localStorage.setItem('token', token);
      // Викликаємо Redux action для збереження користувача і токена
      dispatch(loginUserWithGoogle({ id, email, name, google_id }));
      // Перенаправляємо користувача на головну сторінку
      navigate('/');
    } else if (!google_id) {
      dispatch(fetchAuthMe());
    }
    
    else {

      navigate('/login');
    }
  }, [dispatch, navigate,token]);
};

export default useAuthFromUrl;