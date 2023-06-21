import React from 'react'
import ActualForecast from '../components/ActualForecast'

const PActualForecast = ({permission,forecast,getWeatherIconUrl}) => {
  return (
    <div><ActualForecast permission={permission} forecast={forecast} getWeatherIconUrl={getWeatherIconUrl}/></div>
  )
}

export default PActualForecast