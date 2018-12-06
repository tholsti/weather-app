import React, { Component } from 'react'
import DailyWeather from './DailyWeather'
import styled from 'styled-components'

const WeatherContainer = styled.div`
  display:flex;
  flex-direction: column;
`

const CityInfo = styled.div`
  padding: 1rem 0 1rem 0;
  width: 100vw;
  background-color: rgba(0,0,0,0.5);
  margin-top: 1rem;
`

const WeatherPanel = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 1rem;
`


export default class Weather extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <WeatherContainer>
        
        <CityInfo>
          Weather forecast for
          {this.props.forecast.title}, {this.props.forecast.parent.title}
        </CityInfo>
        <WeatherPanel>
          {console.log(this.props.today)}
          {this.props.forecast.consolidated_weather.map((weather, index) => 
              <DailyWeather weather={weather} day={index}/>
          )}
        </WeatherPanel>
      </WeatherContainer>
      
    )
  }
}
