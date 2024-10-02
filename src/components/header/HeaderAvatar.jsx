
import {
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Button,
    Stack, useDisclosure,
    Box
} from '@chakra-ui/react';
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import ThemeSwitcher from '../buttons/theme-button/ThemeSwitcher'
import { logout } from '../../redux/slices/auth.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HeaderAvatar = () => {
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

        <>
            {token && 
            
            <Box display={['none','none','block']}>
                <Menu >
                <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
                    <Avatar bg='blue.600' icon={<AiOutlineUser fontSize='1.5rem' />} />
                </MenuButton>

                <MenuList display={'flex'} flexDir={'column'}>
             
                    <MenuDivider />
                    <MenuItem display={'flex'} justifyContent={'center'}>
                        <ThemeSwitcher />
                    </MenuItem>

                    <MenuItem display={'flex'} justifyContent={'flex-end'} marginTop={'40px'}>
                        <Button colorScheme='red' onClick={logoutFromAccount}>Вийти</Button>
                    </MenuItem>

                </MenuList>
            </Menu>
            </Box>
            }
        </>







    )
}

export default HeaderAvatar