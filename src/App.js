import React, { Component } from 'react';
import vid from './weather.mp4'
import './App.css';
import CitySearch from './components/CitySearch';
import Weather from './components/Weather';
import styled from 'styled-components'
import Nav from './components/Nav'

const Video = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
`

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: rgba(0,0,0,0.25);
  text-align:center;
  color:white;
  min-height: 50vh;
`

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: null
    }
  }

  componentDidMount() {
    document.getElementById('myVideo').playbackRate = .6
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
  
  render() {
    return (
      <>
        <Video autoPlay muted loop id="myVideo">
          <source src={vid} type="video/mp4" />
          {/* original source of video https://www.youtube.com/watch?v=5RyjirTajCQ */}
        </Video>
        <Nav />
        <AppContainer>
          <CitySearch pickCity={this.setCity}/>
          {this.state.forecast != null &&
            <Weather 
              forecast={this.state.forecast} 
            />
          }
        </AppContainer>
      </>
    );
  }
}

export default App;
