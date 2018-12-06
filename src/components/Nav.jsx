import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components'
import logo from '../logo.svg';

const Navbar = styled.nav`
  background-color: rgba(0,0,0,.8);
  color: white;
  padding:1rem ;
  position: relative;
  width: 100%;
  text-align: center;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`

const Logo = styled.img`
  width: 64px;
  animation: ${rotate} 5s linear infinite;
`

const Links =  styled.div`
`

export default class Nav extends Component {

  render() {
    return (
      <Navbar>
        <Logo src={logo} alt="React Logo"/>
        <Links>
          Weather
        </Links> 
      </Navbar>
    )
  }
}
