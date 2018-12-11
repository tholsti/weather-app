import React, { Component } from 'react'
import styled from 'styled-components'

const Details = styled.div`

`

const WindDir = styled.div`
  display:flex;
`

const Arrow = styled.div`
  margin-left: 1rem;
  transform: rotate(${props => props.dir}deg);
  `

export default class WeatherDetails extends Component {
  
  render() {
    
    return (
      <Details>
        <div>Highest temperature: {this.props.weather.max_temp.toFixed(0)}</div>
        <div>Lowest temperature: {this.props.weather.min_temp.toFixed(0)}</div>
        <div>Wind speed: {(this.props.weather.wind_speed * 1,61).toFixed(0) /* Converting from mph to kmh */} km/h</div>
        <WindDir>Wind direction: {this.props.weather.wind_direction_compass} <Arrow dir={this.props.weather.wind_direction}>↑</Arrow>  </WindDir>
        <div></div>
        <div></div>
      </Details>
    )
  }
}
