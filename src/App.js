import React, { Component } from 'react';
import styled from 'styled-components'
import './App.css';
import weatherVid from './weather.mp4'
import concertVid from './concert.mp4'
import CitySearch from './components/CitySearch';
import Weather from './components/Weather';
import Nav from './components/Nav';
import Concerts from './components/Concerts';

const headers = [
  "Weather",
  "Concerts"
]

const Video = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
`

const AppContainer = styled.div`
  position: relative;
  margin-top: 120px;
  width: 100%;
  background-color: rgba(0,0,0,0.25);
  text-align:center;
  color:white;
  min-height: 50vh;
`

function Header(props) {
  return <h1>{props.mode === 0 ? headers[0] : props.mode === 1 ? headers[1] : ""}</h1>
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickedCity: null,
      mode: 0
    }
  }

  chooseMode = (n) => {
    this.setState({
      mode: n
    })
  }

  pickCity = (city) => {
    if (this.state.mode === 0) {
      this.getForecast(city)
    } else if (this.state.mode === 1) {
      this.getConcerts(city)
    }
  }

  getForecast = (city) => {
    // search weather forecast for selected city
    fetch(`/api/location/${city.woeid}/`)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        this.setState({
          pickedCity: city,
          forecast: json,
        })
      })
  }

  getConcerts = (city) => {
    this.setState({
      pickedCity: city,
      concerts: "Placeholder - list of concerts in " + city.city,
    })
  }

  componentDidMount() {
    document.getElementById('myVideo').playbackRate = .6
  }
  
  render() {
    return (
      <>
        <Video autoPlay muted loop 
          src={this.state.mode === 0 ? weatherVid : this.state.mode === 1 ? concertVid : ""} 
          id="myVideo">
          
          {/* original source of videos https://www.youtube.com/watch?v=5RyjirTajCQ & https://www.youtube.com/watch?v=Eej6AuSHpwY */}
        </Video>
        <Nav mode={this.state.mode} chooseMode={this.chooseMode} headers={headers}/>
        <AppContainer>
          <Header mode={this.state.mode}/>
          <CitySearch pickCity={this.pickCity}/>
          {this.state.pickedCity != null && this.state.forecast && (this.state.mode === 0) &&
            <Weather 
              forecast={this.state.forecast}
              city={this.state.pickedCity}
              getForecast={this.state.getForecast = () => {}}
            />
          }
          {this.state.pickedCity != null && this.state.mode === 1 && 
            <Concerts 
              concerts={this.state.concerts}
              city={this.state.pickedCity}
              getConcerts={this.state.getConcerts = () => {}}
            />
          }
        </AppContainer>
      </>
    );
  }
}

export default App;
