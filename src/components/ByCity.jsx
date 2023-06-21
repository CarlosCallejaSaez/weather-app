import React from 'react';
import { Box, Heading, Text, Image, Center } from '@chakra-ui/react';

const ByCity = ({ permission, currentWeather, getWeatherIconUrl }) => {
  return (
    <Box p={4} bg="gray.200" borderRadius="md">
      {!permission && (
        <Text>Por favor, activa la geolocalización.</Text>
      )}
      {currentWeather.name && permission && (
        <Box>
          <Heading as="h2" size="lg" mb={2}>
            Tiempo Actual en {currentWeather.name}
          </Heading>
          <Text>Temperatura: {currentWeather.main.temp}°C</Text>
          <Text>Descripción: {currentWeather.weather[0].description}</Text>
          <Center>
          <Image
            src={getWeatherIconUrl(currentWeather.weather[0].icon)}
            alt={currentWeather.weather[0].description}
            mt={4}
          />
          </Center>
        </Box>
      )}
    </Box>
  );
};

export default ByCity;
