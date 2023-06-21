import React from 'react'
import ByCityForecast from '../components/ByCityForecast'
import CSpinner from '../components/CSpinner'

const PByCityForecast = ({permission,forecast,getWeatherIconUrl,isLoading}) => {
  return (
    <div>
      {isLoading && <CSpinner/>}
      <ByCityForecast permission={permission} forecast={forecast} getWeatherIconUrl={getWeatherIconUrl}/></div>
  )
}

export default PByCityForecast