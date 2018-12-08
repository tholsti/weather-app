import React, { Component } from 'react'
import styled from 'styled-components'

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
  width: 800px;
  max-width: 90vw;
`


export default class Concerts extends Component {
  componentWillMount() {
    this.props.getConcerts(this.props.city)
  }
  
  render() {
    return (
      <ConcertContainer>
        <CityInfo>
          <h2>{"Upcoming concerts in " + this.props.city.city}</h2>
        </CityInfo>
        <ConcertPanel>
          {this.props.concerts}
        </ConcertPanel>
      </ConcertContainer>

    )
  }
}
