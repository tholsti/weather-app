import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  padding: 1rem;
  text-align: left;
`

const BasicInfo = styled.div`
  font-style: italic;
`
const Artist = styled.span`

`

const Strong = styled.span`
  font-weight: bold;
`

const ConcertBlock = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 1rem;
  margin: .5rem 1rem .5rem 1rem;
  background-image: linear-gradient(to right, #a18cd150, #fbc2eb30);
  overflow: hidden;
  
  ${props => props.focused && css`
    background-image: linear-gradient(to right, #a18cd165, #fbc2eb45);
  `}

`
const Title = styled.div`
  background-color: gray;
  padding: .5rem;
  position: relative;
  background-image: linear-gradient(to right, #fbc2eb90, #a18cd175);
`


const Icon = styled.i`
  position: absolute;
  right: .5rem;
  font-size: 1.5rem;
  top: .325rem;
  cursor: pointer;
  &:hover {
    color: black;
  }
`

const Details = styled.div`
  padding-top: 1rem;
  padding-left: 1rem;  
`



export default class Concert extends Component {

  onFocus = () => {
    this.props.isFocused ?   
      this.props.onFocus(null) : 
      this.props.onFocus(this.props.index);
  }

  render() {
    return (
      <ConcertBlock
        focused={this.props.isFocused}
      >
        <Title>
          {this.props.concert.performance[0].displayName}
          <Icon
            onClick={this.onFocus.bind(this)}
            className={this.props.isFocused ? "fas fa-minus-circle" : "fas fa-plus-circle"} />
        </Title>
        <Container>
          <BasicInfo>
            <div>{this.props.concert.displayName}</div>
          </BasicInfo>
          {this.props.isFocused &&
          <Details>
            <div><Strong>Artist{this.props.concert.length > 1 ? "s" : ""}: </Strong>{this.props.concert.performance.map((artist, index) =>
              <Artist >{artist.displayName}{index !== (this.props.concert.performance.length - 1) ? ", " : ""}</Artist>)}</div>
            <div><Strong>Date: </Strong>{this.props.concert.start.date}</div>
            <div><Strong>Venue: </Strong>{this.props.concert.venue.displayName}</div>

          </Details>
          }
        </Container>
      </ConcertBlock>

    )
  }
}
