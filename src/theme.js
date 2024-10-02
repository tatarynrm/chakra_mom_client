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
const styles = {
    global: (props) => ({
        body: {
            bg: mode("white", "black"), // Білий фон для світлої теми, чорний для темної
            color: mode("blue.500", "yellow.400"), // Блакитний текст для світлої теми, жовтий для темної
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.5",
            margin: 0,
            padding: 0,
        },
        h1: {
            color: mode("blue.600", "yellow.300"), // Заголовок з відтінками
        },
        h2: {
            color: mode("blue.500", "yellow.300"),
        },
        a: {
            color: mode("blue.500", "yellow.300"), // Посилання
            textDecoration: "underline",
            _hover: {
                textDecoration: "none", // Знімаємо підкреслення при наведенні
            },
        },
        p: {
            color: mode("gray.800", "gray.200"), // Текст абзаців
        },
    })
};

// 3. extend the theme
const theme = extendTheme({ config,style })

export default theme