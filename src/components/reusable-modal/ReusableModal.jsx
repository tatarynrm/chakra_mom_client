import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

const ReusableModal = ({ isOpen, onClose, title, children, onConfirm, confirmButtonText = "Confirm", cancelButtonText = "Cancel" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          {/* <Button colorScheme="blue" onClick={onConfirm}>
            {confirmButtonText}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            {cancelButtonText}
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReusableModal;