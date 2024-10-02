import { Box, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { MdOutlineChargingStation } from 'react-icons/md'
import { getCardColors } from '../../../helpers/colors/returnTransportationCardColor'

const TransportationStatusTooltip = ({item}) => {
  return (


<Tooltip  color={'white'} hasArrow label={item.transportation_status} bg={getCardColors(item.status)}>
<Box cursor={'pointer!important'} position={'absolute'} top={0} right={0}>

<MdOutlineChargingStation size={24}  fill={getCardColors(item.status)}/>



</Box>
</Tooltip>
  )
}

export default TransportationStatusTooltip