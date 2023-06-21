import React from 'react'
import ByCity from '../components/ByCity'

const PByCity = ({permission,currentWeather,getWeatherIconUrl}) => {
  return (
    <div><ByCity permission={permission}  currentWeather={currentWeather} getWeatherIconUrl={getWeatherIconUrl}/></div>
  )
}

export default PByCity