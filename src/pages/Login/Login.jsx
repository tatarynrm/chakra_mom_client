import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import instance from '../../utils/axios';
import { fetchAuth } from '../../redux/slices/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleLoginComponent from './ReactLoginComponent';


const Login = () => {
  const userData = useSelector(state => state.auth.data)
  const token = window.localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [tokenData, setTokenData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser = async (email, password) => {
    try {
      const obj = {
        email,
        password
      }

      const data = await dispatch(fetchAuth(obj))
      if (!data.payload || data.payload.length === 0) {
        alert("Не вдалось авторизуватись");
        return navigate("/login");
      }
      if (data.payload.token) {
        setUserId(data.payload.user.id);
        setTokenData(data.payload.token);
        window.localStorage.setItem("token", data.payload.token);
        navigate('/')
      } else {
        return alert('Не вдалось')
      }
    } catch (error) {
      console.log(error);

    }
  }


  return (
    <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} height={'100vh'} width={'100%'}>


      <Box display={'flex'} alignItems={'center'} flexDir={'column'}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await loginUser(values.email, values.password)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form style={{ display: 'flex', flexDirection: 'column', gap: '30px' }} onSubmit={handleSubmit}>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <Input
                type="text"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <Button marginTop={'40px'} type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              <a href="http://localhost:8800/auth/google">Увійти через Google</a>

{/* <GoogleLoginComponent/> */}
            </Form>
          )}
        </Formik>
      </Box>
    </Stack>
  )
}

export default Login