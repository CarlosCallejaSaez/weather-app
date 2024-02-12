import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Box
      bgGradient="linear(to-r, blue.100, blue.600)"
      boxShadow="sm"
      px={4}
      py={3}
      position="fixed"
      width="full"
      zIndex="banner"
    >
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
        <Link to="/">
          <ChakraLink px={3} py={2} color="white" fontSize="lg" fontWeight="bold" _hover={{ textDecoration: 'none', bg: "blue.700", borderRadius: "md" }}>
            Actual Weather
          </ChakraLink>
        </Link>
        <Flex>
          <Link to="/forecast">
            <ChakraLink px={3} py={2} color="white" _hover={{ textDecoration: 'none', bg: "blue.700", borderRadius: "md" }}>
              Forecast
            </ChakraLink>
          </Link>
          <Link to="/bycity">
            <ChakraLink px={3} py={2} color="white" _hover={{ textDecoration: 'none', bg: "blue.700", borderRadius: "md" }}>
              Weather by City
            </ChakraLink>
          </Link>
         
        </Flex>
      </Flex>
    </Box>
  );
}

export default NavBar;
