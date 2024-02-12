import React from 'react';
import { Box, Heading, Text, Image, VStack } from '@chakra-ui/react';

const ActualWeather = ({ permission, currentWeather, getWeatherIconUrl }) => {
  
  const cloudGifUrl = './nublado.gif'; 

  return (
    <Box
      style={{
        backgroundImage: `url(${cloudGifUrl})`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <VStack
        p={5}
        spacing={4}
        backgroundColor="rgba(255, 255, 255, 0.6)" 
        backdropFilter="blur(10px)" 
        borderRadius="lg"
        maxWidth="700px" 
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" 
      >
        {!permission && (
          <Text fontSize="lg" color="black">Please enable location services.</Text>
        )}
        {permission && currentWeather?.name && (
          <>
            <Heading as="h1" size="xl" color="black">
              Current Weather in {currentWeather.name}
            </Heading>
            <Image
              src={getWeatherIconUrl(currentWeather.weather[0].icon)}
              alt="Weather icon"
              boxSize="100px"
            />
            <Text fontSize="2xl" color="black">
              {Math.round(currentWeather.main.temp)}°C
            </Text>
            <Text fontSize="lg" color="black">
              {currentWeather.weather[0].description}
            </Text>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default ActualWeather;
