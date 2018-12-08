import React, { Component } from 'react'
import Weather from './Weather'


export default class WeatherApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      city_forecast: null,
      isLoaded: false
    }

  }


  render() {
    if (this.state.isLoaded) {
    return (
        <Weather 
          forecast={this.state.city_forecast}
          city={this.props.pickedCity}
        />
    ) 
    } else
      return ("loading..")
  }
}
