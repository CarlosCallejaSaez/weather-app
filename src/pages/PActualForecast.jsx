import React from 'react'
import ActualForecast from '../components/ActualForecast'
import CSpinner from '../components/CSpinner'

const PActualForecast = ({permission,forecast,getWeatherIconUrl,isLoading,currentWeather}) => {
  return (
    <div>
      
      {isLoading && <CSpinner/>}
      
      <ActualForecast permission={permission} forecast={forecast} getWeatherIconUrl={getWeatherIconUrl} currentWeather={currentWeather}/></div>
  )
}

export default PActualForecast