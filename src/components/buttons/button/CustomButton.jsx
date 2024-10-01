import React from 'react'
import { Button } from '@chakra-ui/react'
const CustomButton = ({title,colorScheme,func}) => {
  return (
<Button padding={2} fontSize={14}  onClick={func} colorScheme={colorScheme ? colorScheme : 'blue'}>{title}</Button>
  )
}

export default CustomButton