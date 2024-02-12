import React from 'react';
import { Box, Heading, Text, Image, Flex, useColorModeValue } from '@chakra-ui/react';

const ActualForecast = ({ permission, forecast, getWeatherIconUrl, currentWeather }) => {
  const groupedForecast = forecast.reduce((result, data) => {
    const date = new Date(data.dt * 1000).toLocaleDateString();
    if (result[date]) {
      result[date].push(data);
    } else {
      result[date] = [data];
    }
    return result;
  }, {});

  const dailyForecast = Object.values(groupedForecast).map(group => group[0]);

  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(49, 49, 49, 0.8)');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverShadow = useColorModeValue('2xl', 'dark-lg');

  return (
    <Box
      padding={4}
      bgImage="url('./nublado.gif')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      minHeight="100vh"
    >
      {permission && (
        <Flex direction="column" gap={6} justifyContent="center" alignItems="center" marginTop={100}>
          <Heading as="h2" mb={4} size="lg" textAlign="center" color="teal.400">
            Previsión para Hoy + Próximos 5 Días en {currentWeather.name}
          </Heading>
          {dailyForecast.map(data => (
            <Box
              key={data.dt}
              borderWidth="1px"
              borderRadius="lg"
              p={6}
              bg={bgColor}
              borderColor={borderColor}
              boxShadow="base"
              maxW="400px"
              w="full"
              _hover={{
                boxShadow: hoverShadow,
                transform: 'translateY(-5px)',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                Fecha: {new Date(data.dt * 1000).toLocaleDateString()}
              </Text>
              <Text fontSize="md">Temperatura: {Math.round(data.main.temp)} °C</Text>
              <Text fontSize="md">Descripción: {data.weather[0].description}</Text>
              <Text fontSize="md">Viento: {data.wind.speed} m/s</Text>
              <Text fontSize="md">Sensación térmica: {Math.round(data.main.feels_like)} °C</Text>
              <Flex justify="center" mt={4}>
                <Image
                  src={getWeatherIconUrl(data.weather[0].icon)}
                  alt="Icono del Clima"
                  boxSize="50px"
                />
              </Flex>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
}

export default ActualForecast;
