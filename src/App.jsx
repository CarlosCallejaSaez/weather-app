import React, { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [permissionDenied, setPermissionDenied] = useState(false);


useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude)
          setLon(position.coords.longitude)
        },
        (error) => {
          console.error(error);
          setPermissionDenied(true);
        }
      );
    } else {
      console.error("El navegador no soporta la geolocalización");
      setPermissionDenied(true);
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
  return (
    <div>
      <h1>Weather App</h1>
      {permissionDenied && (
        <p>Porfavor activa la geolocalización.</p>
      )}
      {currentWeather.name && !permissionDenied && (
        <div>
          <h2>Tiempo Actual en {currentWeather.name}</h2>
          <p>Temperatura: {currentWeather.main.temp}°C</p>
          <p>Descripción: {currentWeather.weather[0].description}</p>
          <img
            src={getWeatherIconUrl(currentWeather.weather[0].icon)}
            alt={currentWeather.weather[0].description}
          />
        </div>
      )}
      {!permissionDenied && (
        <>
          <h2>Previsión 5 días</h2>
          <ul>
            {forecast.map((weatherData, index) => (
              <li key={index}>
                <p>Fecha: {new Date(weatherData.dt_txt).toLocaleString()}</p>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Descripción: {weatherData.weather[0].description}</p>
                <img
                  src={getWeatherIconUrl(weatherData.weather[0].icon)}
                  alt={weatherData.weather[0].description}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App
