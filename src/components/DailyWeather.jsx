import React, { Component } from 'react'

export default class DailyWeather extends Component {

  render() {
    return (
      <div className="dailyWeather">
        <div className="temperature">
          {this.props.weather.the_temp.toFixed(0)} degrees
        </div>
        <div className="weatherState">
          {this.props.weather.weather_state_name}
          <img src={`/static/img/weather/png/64/${this.props.weather.weather_state_abbr}.png`} alt=""/>
        </div>

      </div>

    )
  }
}
