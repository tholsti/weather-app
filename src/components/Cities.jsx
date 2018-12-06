import React, { Component } from 'react'
import styled from 'styled-components'

const CityList = styled.ul`
  list-style-type: none;
  padding: 0;
  border:1px solid black;
  width: 280px;
  margin:auto;
`

const CityItem = styled.li`
  text-align: left;
  background-color: white;
  color: black;
  font-size: 1.5rem;
  padding: 0;
  padding-left: 1rem;
  cursor: pointer;
  list-style-type: none;
  &:hover { background-color: lightyellow }
`

export default class Cities extends Component {
  pickCity = (city) => {
    this.props.pickCity({
      city: city.title,
      woeid: city.woeid,
    })
    document.getElementById('cityList').parentNode.removeChild(document.getElementById('cityList'));
    document.getElementById('find_city').value = null;
  }

  render() {
    return (
      <CityList id="cityList">
        {this.props.cities.map(city => {
          return ( 
            <CityItem onClick={() => this.pickCity(city)}>
              {city.title}
            </CityItem>)
        })
        }
      </CityList>
    )
  }
}
