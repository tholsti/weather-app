import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components'
import './App.css';
import CitySearch from './components/CitySearch';
import Weather from './components/Weather';
import Nav from './components/Nav';
import Concerts from './components/Concerts';
import WeatherPic from './img/weather.jpg'
import ConcertPic from './img/concert.jpg'

const headers = [
  "Weather",
  "Concerts"
]

const GlobalStyle = createGlobalStyle`
  html {
    background-image: url(${props => props.background === 0 ? WeatherPic : ConcertPic});
    background-size: cover; 
    background-position-x: center;
    background-repeat: repeat-y;
    background-attachment: fixed;
  }
`

const Container = styled.main`
  
`

const Block = styled.div`
  height: 120px;
`

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: rgba(12,12,44,0.6);
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
      mode: 0,
      loading: true,
      extending: false // helper to extend one search to each mode
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
          weatherFor : city
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
              concerts: concerts,
              concertsFor: city
            })
          })
      })
  }
  
  render() {
    return (
      <Container>
        <GlobalStyle background={this.state.mode} />
        <Block />
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
      </Container>
    );
  }
}

export default App;
