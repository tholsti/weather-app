import React, { Component } from 'react'
import DailyWeather from './DailyWeather'
import styled from 'styled-components'

const WeatherContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`

const CityInfo = styled.div`
  padding: 1rem 0 1rem 0;
  width: 100%;
  background-color: rgba(0,0,0,0.5);
  margin-top: 1rem;
`

const WeatherPanel = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 1rem;
  width: 800px;
  max-width: 90vw;
`


export default class Weather extends Component {
  componentWillMount() {
    this.props.getForecast(this.props.city)
  }

  render() {
      return (
        <WeatherContainer>
          <CityInfo>
            <h2>{"Weather forecast for " + this.props.forecast.title}, {this.props.forecast.parent.title}</h2>
          </CityInfo>
          <WeatherPanel>
            {this.props.forecast.consolidated_weather.map((weather, index) =>
              <DailyWeather weather={weather} day={index} />
            )}
          </WeatherPanel>
        </WeatherContainer>

      )
  } 
}
