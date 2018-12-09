import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import WeatherDetails from './WeatherDetails'

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date();

const DayBlock = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 1rem;
  margin: .5rem 1rem .5rem 1rem;
  background-image: linear-gradient(to right, #a18cd150, #fbc2eb30);
  overflow: hidden;
  
  /* &:hover {
    background-image: linear-gradient(to right, #a18cd170, #fbc2eb50);
  } */
  ${props => props.focused && css`
    background-image: linear-gradient(to right, #a18cd165, #fbc2eb45);
  `}

`

const Image = styled.img`
  width: 64px;
  height: 64px;
  ${props => props.focused && css`
    /* width: 256px;
    height: 256px; */
  `
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  text-align: left;
  padding: 1rem;
`

const Weekday = styled.div`
  background-color: gray;
  padding: .5rem;
  position: relative;
  background-image: linear-gradient(to right, #fbc2eb90, #a18cd175);
`

const Icon = styled.i`
  position: absolute;
  right: .5rem;
  font-size: 1.5rem;
  top: .325rem;
  cursor: pointer;
  &:hover {
    color: black;
  }
`

const Details = styled.div`
  padding-left: 1rem;  
`

const Temperature = styled.div`

`

const WeatherState = styled.div`
  
`


export default class DailyWeather extends Component {

  printDay = () => {
    {
      if (this.props.day === 0) {
        return ("Today")
      } else if (this.props.day === 1) {
        return ("Tomorrow")
      } else {
        return (
          this.props.day + today.getDay() > 6) ?
          weekdays[this.props.day + today.getDay() - 7]
          : weekdays[this.props.day + today.getDay()]
      }
    }
  }

  onFocus = () => {
    this.props.isFocused ?
      this.props.onFocus(null) :
      this.props.onFocus(this.props.day);
  }

  render() {
    return (
      <DayBlock
        focused={this.props.isFocused}
        day={this.props.day}
      >
        <Weekday>
          {this.printDay()}
          <Icon 
            onClick={this.onFocus.bind(this)}
            className={this.props.isFocused ? "fas fa-minus-circle" : "fas fa-plus-circle"} />
        </Weekday>
        <Container>
          <Image
            day={this.props.day}
            src={`/static/img/weather/png/64/${this.props.weather.weather_state_abbr}.png`}
            alt={"Weather"}
          />
          <Details>
            <WeatherState>
              {this.props.weather.weather_state_name}
            </WeatherState>
            <Temperature>
              {/* API sometimes returns null insted of zero degrees, therefore validating result */}
              Average temperature: {this.props.weather.the_temp == null ?
                ("0 °C"
                ) : (
                  this.props.weather.the_temp.toFixed(0) + " °C"
                )
              }
            </Temperature>
            {this.props.isFocused ?
              <WeatherDetails weather={this.props.weather} /> : ""}
          </Details>
        </Container>
      </DayBlock>

    )
  }
}
