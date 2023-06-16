import React, { useEffect, useState } from 'react';
import './App.css'
import ActualWeather from './components/ActualWeather';
import ActualForecast from './components/ActualForecast';
import { cities } from './cities';

function App() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [permission, setPermission] = useState(false);


useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude)
          setLon(position.coords.longitude)
          setPermission(true)
        },
        (error) => {
          console.error(error);
          setPermission(false);
        }
      );
    } else {
      console.error("El navegador no soporta la geolocalización");
      setPermission(false);
    }
  }, []);

  useEffect(() => {
    if (lat && lon) {
      fetchWeather(lat, lon);
    }
  }, [lat,lon]);

  const fetchWeather = async (lat, lon) => {
    const API_KEY = "1a7262597e69ba4722faa59c5d71518c";
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
      const currentWeatherResponse = await fetch(currentWeatherUrl);
      const currentWeatherData = await currentWeatherResponse.json();
      setCurrentWeather(currentWeatherData);

      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();
      setForecast(forecastData.list);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  };


  const handleSelect=(e) => {
    setLat(cities[e.target.value].lat)
    setLon(cities[e.target.value].lon)
    
  }
  return (
    <div>
      <select name="select" onChange={handleSelect}>
        <option>--Selecciona Ciudad--</option>
        {cities.map(city=> <option key={city.name} value={city.id}>{city.name}</option>)}
      </select>
       <ActualWeather permission={permission}  currentWeather={currentWeather} getWeatherIconUrl={getWeatherIconUrl}/>
       <ActualForecast permission={permission} forecast={forecast} getWeatherIconUrl={getWeatherIconUrl}/>
    </div>
  );
}

export default App
