import { Box, Button, Card, CardBody, Center, Divider, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FcAlarmClock, FcClock, FcComments } from 'react-icons/fc'
import moment from "moment/moment";
import "moment/locale/uk";
import { FaLocationArrow, FaMonero } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
const TransportationCardItem = ({item}) => {
  return (
<Card position={'relative'} padding={0} >
  <Text position={'absolute'} padding={'2px'} borderRadius={'10px'} backgroundColor={'lightgray'} fontSize={'10px'} color='gray'>{moment(item.created_at).format('LLL')}</Text>

  <CardBody padding={6} display={'flex'} flexDir={['column','column','row']}  gap={'10px'}>
    <Box width={['100%','100%','6%']} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
    <FcAlarmClock size={24} />
    <Text>{moment(item.cargo_date).format('ll')}</Text>
    </Box>
    <Divider orientation='vertical' />
    {/*  */}
    <Box width={['100%','100%','6%']}  display={'flex'} alignItems={'center'} textAlign={'center'}  justifyContent={'center'} >
    <FaLocationArrow size={10} />
    <Text   fontSize={'16px'}>{item.location_from}</Text>
    </Box>
    <Divider orientation='vertical' />
    {/*  */}
    <Box width={['100%','100%','80px']}  display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
    <FaLocationArrow size={10} />
    <Text fontSize={'16px'}>{item.location_to}</Text>
    </Box>
    <Divider orientation='vertical' />
    {/*  */}
    <Box width={['100%','100%','6%']}  display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
  
    <Text fontSize={'20px'}>{item.price}</Text>
    </Box>
    <Divider orientation='vertical' />
    {/*  */}
    <Box  width={['100%','100%','6%']}  display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
    <Text color={'green'} fontSize={'20px'}>{item.cost}</Text>
    </Box>
    <Divider orientation='vertical' />
    {/*  */}
    <Box width={['100%','100%','20%']}  wordBreak={'break-word'}  display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>

    <Text  fontSize={'20px'}>{item.driver}</Text>
    </Box>
    <Divider orientation='vertical' />
    {/*  */}
    <Box width={['100%','100%','10%']}  wordBreak={'break-word'} display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
    
    <Text  fontSize={'20px'}>{item.truck}</Text>
    </Box>
    <Divider orientation='vertical' />
    {/*  */}
    <Box width={['100%','100%','20%']}  display={'flex'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>
    <Text  fontSize={'20px'}>{item.truck_owner}</Text>
    </Box>
    <Divider orientation='vertical' />
  
    <Flex position={'relative'} width={['100%','100%','10%']}  gap={'10px'} alignItems={'center'} textAlign={'center'}  justifyContent={'center'}>
    <Button bottom={0} right={0} position={''} fontSize={10}>{ !item.transportation_comment ? 'Додати коментар' : 'Змінити коментар'}</Button>
    {item.transportation_comment && <BiCommentDetail  color='green' size={30}/>}

 </Flex>


  </CardBody>
</Card>
  )
}

export default TransportationCardItem