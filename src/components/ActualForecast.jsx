import React from 'react';
import { Box, Heading, Text, Image, Grid, GridItem, Center } from '@chakra-ui/react';

const ActualForecast = ({ permission, forecast, getWeatherIconUrl }) => {
  console.log("forecast", forecast);

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
            Previsión hoy + Previsión 5 días
          </Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {dailyForecast.map((data) => (
              <GridItem key={data.dt}>
                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <Text fontSize="lg" fontWeight="bold">
                    Fecha: {new Date(data.dt * 1000).toLocaleDateString()}
                  </Text>
                  <Text>Temperatura: {Math.round(data.main.temp)} °C</Text>
                  <Text>Descripción: {data.weather[0].description}</Text>
                  <Text>Viento: {data.wind.speed} m/s</Text>
                  <Text>Sensación térmica: {Math.round(data.main.feels_like)} °C</Text>
                  <Center>
                  <Image
                    src={getWeatherIconUrl(data.weather[0].icon)}
                    alt="Weather Icon"
                    mt={4}
                  />
                  </Center>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default ActualForecast;
