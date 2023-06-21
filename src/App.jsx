import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import { cities } from './cities';
import { Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer';
import PActualWeather from './pages/PActualWeather';
import PActualForecast from './pages/PActualForecast';
import PByCity from './pages/PByCity';
import PByCityForecast from './pages/PByCityForecast';
import CSpinner from './components/CSpinner';
import NavBar from './components/NavBar';
import { Select } from '@chakra-ui/react';

function App() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [permission, setPermission] = useState(false);
  const [firstGeolocation, setFirstGeolocation] = useState(true);
  const [GeoWeather, setGeoWeather] = useState({});
  const [GeoForecast, setGeoForecast] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDay, setIsDay] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          setPermission(true);
        },
        (error) => {
          console.error(error);
          setPermission(false);
        }
      );
    } else {
      console.error('El navegador no soporta la geolocalización');
      setPermission(false);
    }
  }, []);

  useEffect(() => {
    if (lat && lon) {
      fetchWeather(lat, lon);
    }
  }, [lat, lon]);

  useEffect(() => {
    // Obtenemos la hora actual
    const currentHour = new Date().getHours();
    
    // Determinamos si es de día o de noche
    const isDaytime = currentHour >= 6 && currentHour < 18;
    setIsDay(isDaytime);
  }, []);

  const fetchWeather = async (lat, lon) => {
    const API_KEY = '1a7262597e69ba4722faa59c5d71518c';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
      const currentWeatherResponse = await fetch(currentWeatherUrl);
      const currentWeatherData = await currentWeatherResponse.json();
      if (firstGeolocation) {
        setGeoWeather(currentWeatherData);
      } else {
        setCurrentWeather(currentWeatherData);
      }

      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      if (firstGeolocation) {
        setGeoForecast(forecastData.list);
        setFirstGeolocation(false);
      } else {
        setForecast(forecastData.list);
      }

      setIsLoading(false);

      console.log('Weather', currentWeatherData);
      console.log('forecastData', forecastData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };

  const handleSelect = (e) => {
    setLat(cities[e.target.value].lat);
    setLon(cities[e.target.value].lon);
  };

  return (
    <div className="app-container" style={{ backgroundColor: isDay ? '	gold' : 'grey' }}>
      <NavBar />

      {location.pathname === '/bycity' && (
  <Select name="select" onChange={handleSelect} textAlign="center">
    <option>--Selecciona Ciudad--</option>
    {cities.map((city) => (
      <option key={city.id} value={city.id}>
        {city.name}
      </option>
    ))}
  </Select>
)}

{location.pathname === '/bycityforecast' && (
  <Select name="select" onChange={handleSelect} textAlign="center">
    <option>--Selecciona Ciudad--</option>
    {cities.map((city) => (
      <option key={city.id} value={city.id}>
        {city.name}
      </option>
    ))}
  </Select>
)}
      <Routes>
        <Route
          path="/"
          element={
            <PActualWeather
              permission={permission}
              currentWeather={GeoWeather}
              getWeatherIconUrl={getWeatherIconUrl}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/forecast"
          element={
            <PActualForecast
              permission={permission}
              forecast={GeoForecast}
              getWeatherIconUrl={getWeatherIconUrl}
              isLoading={isLoading}
              currentWeather={GeoWeather}
            />
          }
        />
        <Route
          path="/bycity"
          element={
            <PByCity
              permission={permission}
              currentWeather={currentWeather}
              getWeatherIconUrl={getWeatherIconUrl}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/bycityforecast"
          element={
            <PByCityForecast
              permission={permission}
              forecast={forecast}
              getWeatherIconUrl={getWeatherIconUrl}
              isLoading={isLoading}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
