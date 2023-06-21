import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

const ActualWeather = ({ permission, currentWeather, getWeatherIconUrl }) => {
  console.log("actual weather", currentWeather);
  return (
    <Box>
      {!permission && <Text>Por favor activa la geolocalización.</Text>}
      {currentWeather.name && permission && (
        <Box>
          <Card align="center" bg="yellow">
            <CardHeader>
              <Heading as="h2" size="lg">
                Tiempo Actual en {currentWeather.name}
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>Temperatura: {currentWeather.main.temp}°C</Text>
              <Text>Descripción: {currentWeather.weather[0].description}</Text>
            </CardBody>
            <CardFooter>
              <Center>
                <Image
                  src={getWeatherIconUrl(currentWeather.weather[0].icon)}
                  alt={currentWeather.weather[0].description}
                />
              </Center>
            </CardFooter>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default ActualWeather;
