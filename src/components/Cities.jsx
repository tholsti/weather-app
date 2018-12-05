import React, { Component } from 'react'

export default class Cities extends Component {
  pickCity = (city) => {
    this.props.pickCity({
      city: city.title,
      woeid: city.woeid,
    })
  }

  render() {
    return (

      <ul id={"citiesList"}>
        {console.log(this.state)}
        {this.props.cities.map(city => {
          return <li onClick={() => this.pickCity(city)} className="city">{city.title}</li>
        })
        }
      </ul>
    )
  }
}
