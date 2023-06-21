import React, { useEffect, useState } from 'react';
import './App.css'
import { cities } from './cities';
import { Route, Routes,NavLink } from "react-router-dom"
import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer';
import PActualWeather from './pages/PActualWeather';
import PActualForecast from './pages/PActualForecast';
import PByCity from './pages/PByCity';
import PByCityForecast from './pages/PByCityForecast';
import CSpinner from './components/CSpinner';

function App() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [permission, setPermission] = useState(false);
  const [firstGeolocation, setFirstGeolocation] = useState(true)
  const [GeoWeather, setGeoWeather] =  useState({});
  const [GeoForecast, setGeoForecast] =  useState({});
  const [isLoading, setIsLoading] = useState(true)

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
      if(firstGeolocation){
        setGeoWeather(currentWeatherData)
      
      }else{
        setCurrentWeather(currentWeatherData);
      }
      

      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      if(firstGeolocation){
        setGeoForecast(forecastData.list)
        setFirstGeolocation(false)
      }else{
        setForecast(forecastData.list);
      }
      
      setIsLoading(false)

      console.log("Weather",currentWeatherData);
      console.log("forecastData",forecastData);
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
     <nav className="nav">
<NavLink to="/">Actual Weather</NavLink>
<NavLink to="/forecast">Forecast</NavLink>
<NavLink to="/bycity">Weather by City</NavLink>
<NavLink to="/bycityforecast">Forecast by City</NavLink>

</nav>


      
      <select name="select" onChange={handleSelect}>
        <option>--Selecciona Ciudad--</option>
        {cities.map(city=> <option key={city.name} value={city.id}>{city.name}</option>)}
      </select>

      <Routes>
      <Route path="/" element={<PActualWeather permission={permission}  currentWeather={GeoWeather} getWeatherIconUrl={getWeatherIconUrl}  isLoading={isLoading}     /> } />
      <Route path="/forecast" element={<PActualForecast permission={permission} forecast={GeoForecast} getWeatherIconUrl={getWeatherIconUrl}  isLoading={isLoading} />} />
      <Route path="/bycity" element={<PByCity permission={permission}  currentWeather={currentWeather} getWeatherIconUrl={getWeatherIconUrl}/>}  isLoading={isLoading} />
      <Route path="/bycityforecast" element={<PByCityForecast permission={permission} forecast={forecast} getWeatherIconUrl={getWeatherIconUrl}/>} isLoading={isLoading}  />
      <Route path="*" element={<NotFound />} />
    </Routes>
   
   <Footer />

       {/* <ActualWeather permission={permission}  currentWeather={currentWeather} getWeatherIconUrl={getWeatherIconUrl}/>
       <ActualForecast permission={permission} forecast={forecast} getWeatherIconUrl={getWeatherIconUrl}/>
      <ByCity permission={permission}  currentWeather={currentWeather} getWeatherIconUrl={getWeatherIconUrl}/>
      <ByCityForecast permission={permission} forecast={forecast} getWeatherIconUrl={getWeatherIconUrl}/> */}
    </div>
  );
}

export default App
