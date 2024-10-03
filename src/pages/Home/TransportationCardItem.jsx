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
const TransportationCardItem = ({ item }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const bgColor = useColorModeValue('gray.100', 'gray.700'); // Колір фону для світлої та темної теми
  const textColor = useColorModeValue('black', 'white');

  const [showComment, setShowComment] = useState(false)


  console.log('ITEM', item);

  return (
    <Card position={'relative'} padding={0} >
      <TransportationStatusTooltip item={item} />
      <Text position={'absolute'} padding={'2px'} borderRadius={'10px'} backgroundColor={'lightgray'} fontSize={'10px'} color='gray'>{moment(item.created_at).format('LLL')}</Text>

      <CardBody padding={6} display={'flex'} flexDir={['column', 'column', 'row']} gap={'10px'}>
        <Box width={['100%', '100%', '8%']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
          <FcAlarmClock size={24} />
          <Text color='orange.300'>{moment(item.cargo_date).format('ll')}</Text>
        </Box>
        <Divider orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%', '6%']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'} >
          <FaLocationArrow size={10} />
          <Text fontSize={'16px'}>{item.location_from}</Text>
        </Box>
        <Divider orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%', '80px']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
          <FaLocationArrow size={10} />
          <Text fontSize={'16px'}>{item.location_to}</Text>
        </Box>
        <Divider orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%', '6%']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>

          <Text fontSize={'20px'}>{item.price}</Text>
        </Box>
        <Divider orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%', '6%']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
          <Text color={'green'} fontSize={'20px'}>{item.cost}</Text>
        </Box>
        <Divider orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%', '20%']} wordBreak={'break-word'} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>

          <Text fontSize={'20px'}>{item.driver}</Text>
        </Box>
        <Divider orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%', '10%']} wordBreak={'break-word'} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>

          <Text fontSize={'20px'}>{item.truck}</Text>
        </Box>
        <Divider orientation='vertical' />
        {/*  */}
        <Box width={['100%', '100%', '20%']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
          <Text fontSize={'20px'}>{item.truck_owner}</Text>
        </Box>
        <Divider orientation='vertical' />
        <Box width={['100%', '100%', '20%']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
          <Text fontSize={'20px'}>{item.cargo_owner}</Text>
        </Box>
        <Divider orientation='vertical' />

        <Flex position={'relative'} width={['100%', '100%', '10%']} gap={'10px'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
          {/* <Button onClick={onOpen} bottom={0} right={0} position={''} fontSize={10}>{!item.transportation_comment ? 'Додати коментар' : 'Змінити коментар'}</Button> */}

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