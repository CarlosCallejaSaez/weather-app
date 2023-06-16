import React from 'react'

const ByCityForecast = ({permission,forecast,getWeatherIconUrl}) => {
  return (
    <div> {permission&& (
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
      )}</div>
  )
}

export default ByCityForecast