import React, { Component } from 'react';
import styled from 'styled-components'
import './App.css';
import weatherVid from './weather.mp4'
import concertVid from './concert.mp4'
import CitySearch from './components/CitySearch';
import Weather from './components/Weather';
import Nav from './components/Nav';
import Concerts from './components/Concerts';

sessionStorage.setItem('weatherVidCached', weatherVid);
sessionStorage.setItem('concertVidCached', concertVid);

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
    // change between different apps (weather & concerts)
    this.setState({
      mode: n
    })
  }

  pickCity = (city) => {
    if (this.state.mode === 0) {
      this.setState({
        pickedCity: city
      })
      this.getForecast(city)
    } else if (this.state.mode === 1) {
      this.setState({
        pickedCity: city
      })
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
          forecast: json,
        })
      })
  }

  getConcerts = (city) => {
    // first find the songkick location ID based on the weatherdata city search (to ensure consistency of locations in each app)
    fetch(`https://api.songkick.com/api/3.0/search/locations.json?query=${city.cityName}&apikey=${process.env.REACT_APP_SONGKICK}`)
      .then(response => response.json())
      .then(json => {
        // then do the events query with the location id
        let songkickLocID = json.resultsPage.results.location[0].metroArea.id
        fetch(`https://api.songkick.com/api/3.0/metro_areas/${songkickLocID}/calendar.json?apikey=${process.env.REACT_APP_SONGKICK}&per_page=10
`)
          .then(response => response.json())
          .then(json => {
            console.log(json)
            let concerts = json.resultsPage.results.event
            concerts.sort(function(a,b) {
              if (a.popularity < b.popularity) return 1
              else return - 1
            })
            console.log(concerts)
            this.setState({
              concerts: concerts
            })
          })
      })
  }

  componentDidMount() {
    document.getElementById('myVideo').playbackRate = .6
  }
  
  render() {
    return (
      <>
        <Video autoPlay muted loop 
          src={this.state.mode === 0 ? weatherVid : this.state.mode === 1 ? sessionStorage.getItem('concertVidCached') : ""} 
          id="myVideo">
          
          {/* original source of videos https://www.youtube.com/watch?v=5RyjirTajCQ & https://www.youtube.com/watch?v=Eej6AuSHpwY */}
        </Video>
        <Nav 
          mode={this.state.mode} 
          chooseMode={this.chooseMode} 
          headers={headers}
        />
        <AppContainer>
          <Header mode={this.state.mode}/>
          <CitySearch pickCity={this.pickCity}/>
          {this.state.pickedCity != null && this.state.forecast && (this.state.mode === 0) &&
            <Weather 
              forecast={this.state.forecast}
              city={this.state.pickedCity}
              getForecast={() => this.state.getForecast}
            />
          }
          {this.state.pickedCity && this.state.concerts && this.state.mode === 1 && 
            <Concerts 
            concerts={this.state.concerts}
            city={this.state.pickedCity}
            getConcerts={() => this.state.getConcerts}
            />
          }
        </AppContainer>
      </>
    );
  }
}

export default App;
