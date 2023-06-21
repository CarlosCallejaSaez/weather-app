import React from 'react'

const ByCityForecast = ({permission,forecast,getWeatherIconUrl}) => {
  console.log("forecast",forecast)
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
    <div> {permission&& (
      <div>
      <h2>Actual Forecast</h2>
      {dailyForecast.map((data) => (
        <div key={data.dt}>
          <p>Fecha: {new Date(data.dt * 1000).toLocaleDateString()}</p>
          <p>Temperatura: {Math.round(data.main.temp)} °C</p>
          <p>Descripción: {data.weather[0].description}</p>
          <p>Viento: {data.wind.speed} m/s</p>
          <p>Sensación térmica: {Math.round(data.main.feels_like)} °C</p>
          <img src={getWeatherIconUrl(data.weather[0].icon)} alt="Weather Icon" />
        </div>
      ))}
    </div>
      )}</div>
  )
}

export default ByCityForecast