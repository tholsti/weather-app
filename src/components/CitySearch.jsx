import React, { Component } from 'react'
import Cities from './Cities.jsx'

export default class CitySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesFound: false,
      cities: [],
      pickedCity: ""
    }
  }

  

  componentDidMount() {
    console.log(this.props)
    let citySearch = document.getElementById(`find_city`)
    citySearch.addEventListener('keyup', () => {
      if (citySearch.value.length >= 4) {
        this.setState({
          citiesFound: false,
          cities: []
        })
        // search city from Metaweather API (proxy set in package.json)
        fetch(`/api/location/search/?query=${citySearch.value}`
        )
          .then(response => response.json())
          .then(json => {
            json.map(city => {
              console.log(city)
              this.setState({
                cities: [...this.state.cities, city],
                citiesFound: true,
              })
            })
          })
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
        <p>Enter City:</p>
        <input
          type="text"
          id="find_city"
          placeholder="e.g. London"
        />
        {this.state.citiesFound == true ?
          <Cities
            cities={this.state.cities}
            pickCity={this.props.pickCity}
          /> :
          ""}
      </div>
    )
  }
}
