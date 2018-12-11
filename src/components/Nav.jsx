import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components'
import logo from '../logo.svg';

const Navbar = styled.nav`
  position: fixed;  
  @media (max-height: 650px) {
    position: absolute;
  }
  top: 0;
  background-color: rgba(0,0,0,.8);
  color: white;
  padding:1rem ;
  width: 100%;
  text-align: center;
  height: 120px;
  z-index:1;

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

const Link = styled.span`
  cursor:pointer;
  &:hover {
    font-weight: bold;
  }
  text-decoration: ${props => props.active ? 'underline' : 'none'};
  
`

export default class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode:this.props.mode
    }
  }

  chooseMode = (n) => {
    this.setState({
      mode: n
    })
    this.props.chooseMode(n)
  }

  render() {
    return (
      <Navbar>
        <Logo src={logo} alt="React Logo"/>
        <Links>
          [ <Link active={this.state.mode === 0 ? true : false} onClick={() => this.chooseMode(0)}> {this.props.headers[0]}
          </Link> ][ 
          {' '}<Link active={this.state.mode === 1 ? true : false} onClick={() => this.chooseMode(1)}> {this.props.headers[1]}
          </Link> ]
        </Links> 
      </Navbar>
    )
  }
}
