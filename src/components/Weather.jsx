import React, { Component } from 'react'
import DailyWeather from './DailyWeather'
import styled from 'styled-components'

const WeatherContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  a {
    color:white;
    text-decoration: none;
    &:hover {
      color: black
    }
  }
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
  padding-bottom: 1rem;
  width: 600px;
  max-width: 90vw;
`


export default class Weather extends Component {
  constructor(props) {
    super(props)

    this.state = {
      focus: 0
    }
  }

  componentWillMount() {
    this.props.getForecast(this.props.city)
  }

  onFocus = (e) => {
    this.setState({
      focus: e 
    })
  }

  render() {
      return (
        <WeatherContainer>
          <CityInfo>
            <h2>{"Weather forecast for " + this.props.forecast.title}, {this.props.forecast.parent.title}</h2>
          </CityInfo>
          <WeatherPanel>
            {this.props.forecast.consolidated_weather.map((weather, index) =>
              <DailyWeather 
                weather={weather} 
                day={index} 
                isFocused={index === this.state.focus}
                onFocus={this.onFocus} />
            )}
            Weather information provided by <a href="https://www.metaweather.com/">metaweather.com</a>
          </WeatherPanel>
        </WeatherContainer>

      )
  } 
}
