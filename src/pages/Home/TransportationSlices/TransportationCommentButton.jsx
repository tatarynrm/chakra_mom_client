import { Box, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { BiCommentDetail } from 'react-icons/bi'

const TransportationCommentButton = ({item,setShowComment}) => {
  return (
    <>
    
    {item.transportation_comment ?
  <Tooltip label='Показати коментарі'>

<Box cursor={'pointer!important'} position={'relative'}>
              <BiCommentDetail onClick={() => {
                setShowComment(val => !val)
              }
              } color='green' size={30} />
            </Box>
  </Tooltip>
            : <Box bgColor={'transparent'}>
              <BiCommentDetail onClick={() => {
                setShowComment(false)

              }
              } color='transparent' size={30} />
            </Box>
          }
    </>
  )
}

export default TransportationCommentButton