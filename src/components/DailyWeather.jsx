import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = new Date();

const Weekday = styled.div`

`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding-left: 1rem;
`
const DayBlock = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 1rem;
  margin: .5rem 1rem .5rem 1rem;
  padding: .5rem;
  background-image: linear-gradient(to right, #a18cd150, #fbc2eb30);

  ${props => props.day == 0 && css`
    color: black;
    height: 300px;
  `
  }
`

const Temperature = styled.div`

`

const WeatherState = styled.div`
  
`

const Image = styled.img`
  width: 64px;
  height: 64px;
  ${props => props.day == 0 && css`
    width: 256px;
    height: 256px;
  `
  }
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


  render() {
    return (
      <DayBlock day={this.props.day}>
        <Image
          day={this.props.day}
          src={this.props.day === 0 ?
            `/static/img/weather/png/${this.props.weather.weather_state_abbr}.png` : `/static/img/weather/png/64/${this.props.weather.weather_state_abbr}.png`}

          alt={"Weather"}
        />
        <Container>
          <Weekday>
            {this.printDay()}

          </Weekday>
          <Temperature>
            {/* API sometimes returns null insted of zero degrees, therefore validating result */}
            {this.props.weather.the_temp == null ?
              ("0 °C"
              ) : (
                  this.props.weather.the_temp.toFixed(0) + " °C" 
              )
            }
          </Temperature>
          <WeatherState>
            {this.props.weather.weather_state_name}
          </WeatherState>
        </Container>
      </DayBlock>

    )
  }
}
