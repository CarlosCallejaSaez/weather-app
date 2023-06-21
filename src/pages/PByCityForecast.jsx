import React from 'react'
import ByCityForecast from '../components/ByCityForecast'
const PByCityForecast = ({permission,forecast,getWeatherIconUrl}) => {
  return (
    <div><ByCityForecast permission={permission} forecast={forecast} getWeatherIconUrl={getWeatherIconUrl}/></div>
  )
}

export default PByCityForecast