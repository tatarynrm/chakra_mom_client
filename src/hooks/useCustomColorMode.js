import { useColorMode } from '@chakra-ui/react';

const useCustomColorMode = () => {
  const { colorMode } = useColorMode();
  return colorMode;
};

export default useCustomColorMode;
