import React from 'react';
import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react';

const ActualForecast = ({ permission, forecast, getWeatherIconUrl, currentWeather }) => {
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
    <Box>
      {permission && (
        <Box>
          <Heading as="h2" mb={4}>
            Previsión hoy + Previsión 5 días en {currentWeather.name}
          </Heading>
          <Flex direction="column" gap={4} justifyContent="center" alignItems="center">
            {dailyForecast.map((data) => (
              <Box
                key={data.dt}
                borderWidth="1px"
                borderRadius="md"
                p={4}
                flex={1} 
                bg="background: rgb(199,141,160);
                background: linear-gradient(90deg, rgba(199,141,160,0.8100490196078431) 33%, rgba(148,218,233,1) 100%);
                max-width: 400px;"
              >
                <Text fontSize="lg" fontWeight="bold">
                  Fecha: {new Date(data.dt * 1000).toLocaleDateString()}
                </Text>
                <Text>Temperatura: {Math.round(data.main.temp)} °C</Text>
                <Text>Descripción: {data.weather[0].description}</Text>
                <Text>Viento: {data.wind.speed} m/s</Text>
                <Text>Sensación térmica: {Math.round(data.main.feels_like)} °C</Text>
                <Flex justify="center" mt={4}>
                  <Image
                    src={getWeatherIconUrl(data.weather[0].icon)}
                    alt="Weather Icon"
                  />
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export default ActualForecast;
