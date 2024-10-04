import { Box, Button, Divider, Flex, Image, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import ThemeSwitcher from '../buttons/theme-button/ThemeSwitcher'
import CustomButton from '../buttons/button/CustomButton'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/auth.slice'
import { CiBurger } from 'react-icons/ci'
import { GiHamburger, GiHamburgerMenu } from 'react-icons/gi'
import MobileNav from './MobileNav'
import HeaderAvatar from './HeaderAvatar'
import TotalSumCount from './TotalSumCount'

import logo from '../../assets/images/png/logo/logo.WEBP'



const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const token = localStorage.getItem('token');




  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutFromAccount = () => {
    dispatch(logout());
    window.localStorage.clear();
    navigate('/login')

  };
  return (

    <Box padding={'10px'} display={'flex'} justifyContent={'space-between'}>

      <Stack width={'100%'} display={'flex'} gap={'10px'} flexDirection={'row'} alignItems={'center'} textAlign={'center'}>

        <Link to={'/'}>
          <Box  width={['60px', '60px']} height="auto">
            <Image borderRadius='full'
              width="100%" objectFit="cover" src={logo} />
          </Box>
        </Link>
        <TotalSumCount />

      </Stack>



      {/* {token && <Stack display={['none', 'none', 'flex']} flexDir={'row'} gap={'40px'} width={'100%'} alignItems={'center'} textAlign={'center'}>
        <Link to={'/'}>
          <Text>Головна</Text>
        </Link>
        <Link to={'/news'}>
          <Text>Новини</Text>
        </Link>
        <Link to={'/currencies'}>
          <Text>Курси валют</Text>
        </Link>
      </Stack>} */}

      <HeaderAvatar />


      <Box onClick={onOpen} display={['block', 'block', 'none']}>
        <GiHamburgerMenu size={40} />
      </Box>

      <MobileNav onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
    </Box>
  )
}

export default Navbar