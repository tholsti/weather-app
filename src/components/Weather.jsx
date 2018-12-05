import React, { Component } from 'react'
import DailyWeather from './DailyWeather'

export default class Weather extends Component {

  render() {
    return (
      <div className="weather">
        {this.props.forecast.title}, {this.props.forecast.parent.title}
        {this.props.forecast.consolidated_weather.map(weather => 
            <DailyWeather weather={weather}/>
        )}
      </div>
      
    )
  }
}
