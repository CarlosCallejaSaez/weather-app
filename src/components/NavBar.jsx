import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Link as ChakraLink, Text } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <Box bg="blue.500" py={4}>
      <Flex align="center" justify="center">
        <Link to="/">
          <ChakraLink color="white" mx={2}>
            Actual Weather
          </ChakraLink>
        </Link>
        <Link to="/forecast">
          <ChakraLink color="white" mx={2}>
            Forecast
          </ChakraLink>
        </Link>
        <Link to="/bycity">
          <ChakraLink color="white" mx={2}>
            Weather by City
          </ChakraLink>
        </Link>
        <Link to="/bycityforecast">
          <ChakraLink color="white" mx={2}>
            Forecast by City
          </ChakraLink>
        </Link>
      </Flex>
    </Box>
  );
}

export default NavBar;
