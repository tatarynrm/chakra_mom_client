import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
  } from '@chakra-ui/react';
  import EarningsPicker from '../date-picker/EarningsPicker';
  
  const CalendarModal = ({ isOpen, onOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Оберіть період</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EarningsPicker />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose} autoFocus>
              Закрити
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default CalendarModal;
  