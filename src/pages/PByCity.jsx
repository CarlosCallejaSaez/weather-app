import React from 'react'
import ByCity from '../components/ByCity'
import CSpinner from '../components/CSpinner'

const PByCity = ({permission,currentWeather,getWeatherIconUrl,isLoading}) => {
  return (
    <div>
       {isLoading && <CSpinner/>}
      <ByCity permission={permission}  currentWeather={currentWeather} getWeatherIconUrl={getWeatherIconUrl}/></div>
  )
}

export default PByCity