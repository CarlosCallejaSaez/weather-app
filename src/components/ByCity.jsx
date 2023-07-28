import React from 'react';
import styled from 'styled-components';

const WeatherCard = styled.div`
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #f5f5f5;
  max-width: 400px;
  margin: 0 auto;
  min-height: calc(100vh - 120px); 
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

const ByCity = ({ permission, currentWeather, getWeatherIconUrl }) => {
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

export default ByCity;
