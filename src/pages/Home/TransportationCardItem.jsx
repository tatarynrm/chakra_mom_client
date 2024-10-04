import { Box, Button, Card, CardBody, CardFooter, Center, Divider, Flex, Heading, SlideFade, Text, Tooltip, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FcAlarmClock, FcClock, FcComments } from 'react-icons/fc'
import moment from "moment/moment";
import "moment/locale/uk";
import { FaLocationArrow, FaMonero } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import ReusableModal from './../../components/reusable-modal/ReusableModal';
import CommentCreateForm from '../../components/forms/CommentCreateForm';
import { EditIcon } from '@chakra-ui/icons';
import TransportationEditButton from './TransportationSlices/TransportationEditButton';
import { MdOutlineChargingStation } from 'react-icons/md';
import { getCardColors } from '../../helpers/colors/returnTransportationCardColor';
import TransportationStatusTooltip from './TransportationSlices/TransportationStatusTooltip';
import TransportationCommentButton from './TransportationSlices/TransportationCommentButton';
import useCustomColorMode from '../../hooks/useCustomColorMode';
const TransportationCardItem = ({ item }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const bgColor = useColorModeValue('gray.100', 'gray.700'); // Колір фону для світлої та темної теми
  const textColor = useColorModeValue('black', 'white');

  const [showComment, setShowComment] = useState(false)


const colorMode = useCustomColorMode();

console.log('colorMode',colorMode);


  return (
    <Card  border={colorMode === 'dark' ? '1px solid lightgray': "1px solid black"} position={'relative'} padding={0} >
      <TransportationStatusTooltip item={item} />
      <Text position={'absolute'} padding={'2px'} borderRadius={'10px'} backgroundColor={'lightgray'} fontSize={'10px'} color='gray'>{moment(item.created_at).format('LLL')}</Text>

      <CardBody fontSize={['14px','16px']} padding={6} display={'flex'} flexDir={['column', 'column', 'column','row']} gap={'10px'}>
        <Box width={['100%', '100%','100%', '6%']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
          <FcAlarmClock size={24} />
          <Text color='orange.300'>{moment(item.cargo_date).format('ll')}</Text>
        </Box>
        <Divider borderColor={colorMode === 'dark' ? "whitesmoke" : "gray"} orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%', '100%','10%']} display={'flex'} alignItems={'center'} textAlign={'left'} justifyContent={'center'} >
     
          <Text  >{item.location_from.toUpperCase()}</Text>
        </Box>
        <Divider borderColor={colorMode === 'dark' ? "whitesmoke" : "gray"} orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%', '100%','10%']} display={'flex'} alignItems={'center'} textAlign={'left'} justifyContent={'center'}>
     
          <Text >{item.location_to.toUpperCase()}</Text>
        </Box>
        <Divider borderColor={colorMode === 'dark' ? "whitesmoke" : "gray"} orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%','100%', '6%']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>

          <Text >{item.price.toString().toUpperCase()}</Text>
        </Box>
        <Divider borderColor={colorMode === 'dark' ? "whitesmoke" : "gray"} orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%','100%', '6%']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
          <Text color={'green'}>{item.cost}</Text>
        </Box>
        <Divider borderColor={colorMode === 'dark' ? "whitesmoke" : "gray"} orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%','100%', '20%']} wordBreak={'break-word'} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>

          <Text >{item.driver.toUpperCase()}</Text>
        </Box>
        <Divider borderColor={colorMode === 'dark' ? "whitesmoke" : "gray"} orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%', '100%','10%']} wordBreak={'break-word'} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>

          <Text >{item.truck.toUpperCase()}</Text>
        </Box>
        <Divider borderColor={colorMode === 'dark' ? "whitesmoke" : "gray"} orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%','100%', '20%']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
          <Text >{item.truck_owner.toUpperCase()}</Text>
        </Box>
        <Divider borderColor={colorMode === 'dark' ? "whitesmoke" : "gray"} orientation='vertical' />
        <Box width={['100%', '100%','100%', '20%']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
          <Text >{item.cargo_owner.toUpperCase()}</Text>
        </Box>
        <Divider borderColor={colorMode === 'dark' ? "whitesmoke" : "gray"} orientation='vertical' />

        <Flex position={'relative'} width={['100%', '100%', '100%','10%']} gap={'10px'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
         

<TransportationCommentButton item={item} setShowComment={setShowComment}/>
          <TransportationEditButton item={item} />
        </Flex>


        <ReusableModal onClose={onClose} isOpen={isOpen} onOpen={onOpen}>
          <CommentCreateForm item={item} onClose={onClose} />
        </ReusableModal>


      </CardBody>
      {showComment &&

        <CardFooter roundedBottom='md'  >

          <Heading size={'xs'} color={'orange'}>Коментар</Heading>

          <SlideFade in={showComment} offsetZ='60px'>
            <Box
              p='4px'
              color='white'
              mt='4'
              bg={bgColor}
              rounded='md'
              shadow='md'
            >
              <Text whiteSpace={'pre-wrap'} color={textColor} wordBreak={'break-word'}>{item.transportation_comment}</Text>
            </Box>
          </SlideFade>

        </CardFooter>
      }
    </Card>
  )
}

export default TransportationCardItem