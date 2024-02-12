import React, { useState, useEffect } from 'react';
import {
  Box,
  Select,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';

const API_KEY = '1a7262597e69ba4722faa59c5d71518c';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const cities = [
  { name: 'Madrid', value: 'Madrid,es' },
  { name: 'New York', value: 'New York,us' },
  { name: 'Tokyo', value: 'Tokyo,jp' },
];

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    if (city) {
      // Fetch current weather
      fetch(`${WEATHER_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => setCurrentWeather(data));

      // Fetch 5-day forecast
      fetch(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => setForecast(data.list));
    }
  }, [city]);

  const cloudBgUrl = './nublado.gif'; 

  return (
    <Center
      minH="100vh"
      bgImage={`url(${cloudBgUrl})`}
      bgPos="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      flexDirection="column"
    >
      <Box width="full" p={5} textAlign="center">
        <Select
          placeholder="Select a city"
          onChange={(e) => setCity(e.target.value)}
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          borderColor={useColorModeValue('gray.300', 'gray.700')}
          maxWidth={200}
          mx="auto"
        >
          {cities.map((c) => (
            <option key={c.value} value={c.value}>{c.name}</option>
          ))}
        </Select>
      </Box>
      {currentWeather && (
        <Box
          bg={useColorModeValue('rgba(255,255,255,0.8)', 'rgba(0,0,0,0.6)')}
          borderRadius="lg"
          backdropFilter="blur(10px)"
          boxShadow="xl"
          p={4}
          m={4}
          maxWidth="700px"
          width="full"
          textAlign="center"
        >
          <Heading as="h3" size="lg">{currentWeather.name}</Heading>
          <Text>Temperature: {currentWeather.main.temp}°C</Text>
          <Text>Description: {currentWeather.weather[0].description}</Text>
          {currentWeather.weather[0].icon && (
            <Center>
            <Image
              src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
              alt="Weather icon"
            />
            </Center>
          )}
        </Box>
      )}
      {forecast && (
        <VStack spacing={4} m={4}>
          {forecast.slice(0, 5).map((f, index) => (
            <Box key={index}
              bg={useColorModeValue('rgba(255,255,255,0.8)', 'rgba(0,0,0,0.6)')}
              borderRadius="lg"
              backdropFilter="blur(10px)"
              boxShadow="xl"
              p={4}
              maxWidth="700px"
              width="full"
              textAlign="center"
            >
              <Text><b>Date:</b> {new Date(f.dt * 1000).toLocaleDateString()}</Text>
              <Text><b>Temp:</b> {f.main.temp}°C</Text>
              <Text><b>Description:</b> {f.weather[0].description}</Text>
              <Center>
              <Image
                src={`http://openweathermap.org/img/wn/${f.weather[0].icon}.png`}
                alt="Weather icon"
              />
              </Center>
            </Box>
          ))}
        </VStack>
      )}
    </Center>
  );
};

export default WeatherApp;
