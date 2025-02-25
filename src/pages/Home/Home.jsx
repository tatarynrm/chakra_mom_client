import { Box, Button, Input, Stack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import ReusableModal from '../../components/reusable-modal/ReusableModal'
import CreateTransportationForm from '../../components/forms/CreateTransportationForm';
import TransportationsList from './TransportationsList';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const {isOpen,onOpen,onClose} = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const handleConfirm = () => {
    // Your confirm action logic here
    console.log('Confirmed!');
    onClose(); // Close the modal after confirmation
  };
  return (
   <Stack width={'96%'} height={'90vh'} margin={'0 auto'}>
<Box display={'flex'} gap={'10px'}>

<Button fontSize={12} onClick={onOpen} colorScheme="teal">Створити</Button>
<Input
        type="text"
        placeholder="Search transportations..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
</Box>

<TransportationsList searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
<ReusableModal
isOpen={isOpen}
onClose={onClose}
>
<CreateTransportationForm onClose={onClose}/>   
</ReusableModal>

   </Stack>
  )
}

export default Home