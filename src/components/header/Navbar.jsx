import { Box, Button, Divider, Flex, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import ThemeSwitcher from '../buttons/theme-button/ThemeSwitcher'
import CustomButton from '../buttons/button/CustomButton'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/auth.slice'
import { CiBurger } from 'react-icons/ci'
import { GiHamburger, GiHamburgerMenu } from 'react-icons/gi'
import MobileNav from './MobileNav'
import HeaderAvatar from './HeaderAvatar'
import TotalSumCount from './TotalSumCount'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const token = localStorage.getItem('token')
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
          <Text>LOGISTIC</Text>
        </Link>


<TotalSumCount/>

      </Stack>

  

      {token && <Stack display={['none','none','flex']} flexDir={'row'} gap={'40px'} width={'100%'}>
        <Link to={'/'}>
          <Text>Головна</Text>
        </Link>
        <Link to={'/news'}>
          <Text>Новини</Text>
        </Link>
        <Link to={'/currencies'}>
          <Text>Курси валют</Text>
        </Link>
      </Stack>}

      <HeaderAvatar/>


     <Box onClick={onOpen} display={['block','block','none']}>
     <GiHamburgerMenu  size={40} />
     </Box>

     <MobileNav onClose={onClose} isOpen={isOpen} onOpen={onOpen}/>
    </Box>
  )
}

export default Navbar