import React, { Component } from 'react'
import Cities from './Cities.jsx'
import axios from 'axios'
import styled from 'styled-components'

const CityInput = styled.input`
  font-size: 1.5rem;
  padding: .5rem;
  border-radius: 10px;
  border-color: black;
  border: 2px solid;
  width: 300px;
`

const Par = styled.p`
  padding-top: 1.5rem;
  padding-bottom: .5rem;
`

export default class CitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesFound: false,
      cities: [],
      pickedCity: "",
    }
  }



  componentDidMount() {
    let timeout = null;
    let citySearch = document.getElementById(`find_city`)
    citySearch.addEventListener('keyup', () => {
      clearTimeout(timeout)
      if (citySearch.value.length >= 3) {
        // search city from Metaweather API (proxy set in package.json). Timeout to cancel calls while typing.
        timeout = setTimeout(() => {
          axios.get(`/api/location/search/?query=${citySearch.value}`
          )
            .then(json => {
              json.data.map(city => {
                this.setState({
                  cities: [...this.state.cities, city],
                  citiesFound: true,
                })
                return "";
              })
            })

        }, 250);
      }

      else {
        this.setState({
          citiesFound: false,
          cities: []
        })
      }
    })
  }

  render() {
    return (
      <div className="locationPick">
        <Par>Search for a city</Par>
        <CityInput
          type="text"
          id="find_city"
          placeholder="e.g. London"
        />
        {this.state.citiesFound === true ?
          <Cities
            cities={this.state.cities}
            pickCity={this.props.pickCity}
          /> :
          ""}
      </div>
    )
  }
}
