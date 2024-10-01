// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'
import { style } from 'framer-motion/client'
import {mode} from '@chakra-ui/theme-tools'
// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const styles ={
    global:(props) =>({
        body:{
            bg:mode(
                props.theme.semanticTokens.colors['chakra-body-bg']._light,
                "black"
              
            
            )
        }
    })
}

// 3. extend the theme
const theme = extendTheme({ config,style })

export default theme