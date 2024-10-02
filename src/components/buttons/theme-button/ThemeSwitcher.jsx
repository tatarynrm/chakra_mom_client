import { Button, useColorMode,IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const ThemeSwitcher = () => {
    const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton width={'100px'} height={'40px'} size={10} fontSize={18} icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}  onClick={toggleColorMode}/>
  )
}

export default ThemeSwitcher