import React from 'react'
import ActualForecast from '../components/ActualForecast'
import CSpinner from '../components/CSpinner'

const PActualForecast = ({permission,forecast,getWeatherIconUrl,isLoading}) => {
  return (
    <div>
      
      {isLoading && <CSpinner/>}
      
      <ActualForecast permission={permission} forecast={forecast} getWeatherIconUrl={getWeatherIconUrl}/></div>
  )
}

export default PActualForecast