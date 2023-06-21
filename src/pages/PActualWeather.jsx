import React from 'react'
import ActualWeather from '../components/ActualWeather'

const PActualWeather = ({permission,currentWeather,getWeatherIconUrl}) => {
  return (
    <div> 
        <ActualWeather permission={permission}  currentWeather={currentWeather} getWeatherIconUrl={getWeatherIconUrl}/></div>
  )
}

export default PActualWeather