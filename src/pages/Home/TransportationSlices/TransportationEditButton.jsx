import React from 'react'
import ReusableModal from '../../../components/reusable-modal/ReusableModal'
import { Box, Tooltip, useDisclosure } from '@chakra-ui/react'
import EditTransportationForm from '../../../components/forms/EditTransportation'
import { EditIcon } from '@chakra-ui/icons'

const TransportationEditButton = ({item}) => {
    const {isOpen,onOpen,onClose} = useDisclosure()
  return (
 <>
 <Tooltip label='Редагувати'>

 <Box onClick={onOpen} cursor={'pointer!important'}>
    <EditIcon fontSize={24}/>
    </Box>
 </Tooltip>


<ReusableModal isOpen={isOpen} onClose={onClose}>
<EditTransportationForm  onClose={onClose} item={item}/>

</ReusableModal>

 </>
  )
}

export default TransportationEditButton