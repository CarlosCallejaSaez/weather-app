import React from 'react'

const ActualWeather = ({permission,currentWeather,getWeatherIconUrl}) => {

  console.log("actual weather",currentWeather)
  return (
    <div>
         <h1>Weather App</h1>
      {!permission && (
        <p>Por favor activa la geolocalización.</p>
      )}
      {currentWeather.name && permission && (
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
    </div>
  )
}

export default ActualWeather