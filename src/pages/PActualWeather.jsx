import React from 'react'
import ActualWeather from '../components/ActualWeather'
import CSpinner from '../components/CSpinner'

const PActualWeather = ({permission,currentWeather,getWeatherIconUrl,isLoading}) => {
  return (
    <div> 
      {isLoading && <CSpinner/>}
        <ActualWeather permission={permission}  currentWeather={currentWeather} getWeatherIconUrl={getWeatherIconUrl}/></div>
  )
}

export default PActualWeather