import React from 'react';
import { Box, Heading, Text, Image, Flex, Center } from '@chakra-ui/react';

const ByCityForecast = ({ permission, forecast, getWeatherIconUrl }) => {
  // Agrupar las previsiones por día
  const groupedForecast = forecast.reduce((result, data) => {
    const date = new Date(data.dt * 1000).toLocaleDateString(); // Obtener la fecha en formato local sin la hora
    if (result[date]) {
      result[date].push(data);
    } else {
      result[date] = [data];
    }
    return result;
  }, {});

  // Obtener la primera previsión de cada día
  const dailyForecast = Object.values(groupedForecast).map((group) => group[0]);

  return (
    <Box p={4} bg="gray.200" borderRadius="md">
      {permission && (
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Previsión hoy + Previsión 5 días
          </Heading>
          <Flex flexWrap="wrap">
            {dailyForecast.map((data) => (
              <Box
                key={data.dt}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                p={4}
                mx={2}
                mb={4}
                width={{ base: '100%', sm: '45%', md: '30%' }}
              >
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  {new Date(data.dt * 1000).toLocaleDateString()}
                </Text>
                <Text>Temperatura: {Math.round(data.main.temp)} °C</Text>
                <Text>Descripción: {data.weather[0].description}</Text>
                <Text>Viento: {data.wind.speed} m/s</Text>
                <Text>Sensación térmica: {Math.round(data.main.feels_like)} °C</Text>
                <Center>
                <Image src={getWeatherIconUrl(data.weather[0].icon)} alt="Weather Icon" mt={4} />
                </Center>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default ByCityForecast;
