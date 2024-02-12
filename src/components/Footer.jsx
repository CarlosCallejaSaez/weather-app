import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      bgGradient="linear(to-r, blue.400, #2D3E50)"
      color="white"
      p="20px"
      textAlign="center"
      boxShadow="0 -2px 10px rgba(0, 0, 0, 0.3)"
      letterSpacing="1px"
      fontSize="16px"
      fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    >
      <Text>
        Developed with ♥ by Carlos Calleja Sáez © {new Date().getFullYear()}
      </Text>
    </Box>
  );
};

export default Footer;
