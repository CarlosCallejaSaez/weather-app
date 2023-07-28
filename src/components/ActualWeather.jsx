import React from "react";
import styled from "styled-components";

const WeatherCard = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background: rgb(199,141,160);
  background: linear-gradient(90deg, rgba(199,141,160,0.8100490196078431) 33%, rgba(148,218,233,1) 100%);
  max-width: 400px;
  max-width: 400px;
  margin: 0 auto;
  height: calc(100vh - 120px); /* El valor 120px es para dejar espacio para el footer */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 200px;
  padding-bottom: 200px;
`;

const LocationHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const TemperatureText = styled.p`
  font-size: 18px;
  margin-bottom: 5px;
`;

const DescriptionText = styled.p`
  font-size: 16px;
`;

const WeatherIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeatherIcon = styled.img`
  width: 64px;
  height: 64px;
`;

const ActualWeather = ({ permission, currentWeather, getWeatherIconUrl }) => {
  return (
    <WeatherCard>
      {!permission && <p>Por favor activa la geolocalización.</p>}
      {currentWeather.name && permission && (
        <>
          <LocationHeading>Tiempo Actual en {currentWeather.name}</LocationHeading>
          <TemperatureText>
            Temperatura: {Math.round(currentWeather.main.temp)}°C
          </TemperatureText>
          <DescriptionText>
            Descripción: {currentWeather.weather[0].description}
          </DescriptionText>
          <WeatherIconContainer>
            <WeatherIcon
              src={getWeatherIconUrl(currentWeather.weather[0].icon)}
              alt={currentWeather.weather[0].description}
            />
          </WeatherIconContainer>
        </>
      )}
    </WeatherCard>
  );
};

export default ActualWeather;
