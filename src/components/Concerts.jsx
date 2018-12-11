import React, { Component } from 'react'
import styled from 'styled-components'
import Concert from './Concert'
import sk from '../powered-by-songkick-white.png'

const ConcertContainer = styled.div`
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

const ConcertPanel = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 1rem;
  width: 600px;
  max-width: 90vw;
`

export default class Concerts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      focus: null
    }
  }

  componentDidMount() {
    this.props.getConcerts(this.props.city)
  }

  onFocus = (e) => {
    this.setState({
      focus: e
    })
  }
  
  render() {
    return (
      <ConcertContainer>
        <CityInfo>
          <h2>{"Upcoming concerts in " + this.props.city.cityName}</h2>
        </CityInfo>
        <ConcertPanel>
          {this.props.concerts.map((concert, index) =>
            <Concert
              concert={concert}
              isFocused={index === this.state.focus}
              index={index}
              onFocus={this.onFocus} />
          )}
        </ConcertPanel>
        <img src={sk} alt="concerts by songkick" width="100px"/>
      </ConcertContainer>

    )
  }
}
