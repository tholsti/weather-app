import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CitySearch from './components/CitySearch';
import Weather from './components/Weather';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null
    }
  }
  setCity = (city) => {
    this.setState({
      pickedCity: city.city,
      woeid: city.woeid
    })
    // search weather forecast for selected city
    fetch(`/api/location/${city.woeid}/`)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        this.setState({
          forecast: json
        })
      })
  }
  
  showForecast = () => {

  }

  render() {
    return (
      <div className="App">
        <CitySearch pickCity={this.setCity}/>
        {this.state.forecast != null &&
          <Weather forecast={this.state.forecast} />
        }
      </div>
    );
  }
}

export default App;
