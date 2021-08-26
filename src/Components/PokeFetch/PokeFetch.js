import React, { Component } from 'react'
import './PokeFetch.css';

// darken the image of the pokemon - done
// create a timer that counts down from 10 to 0 - done 
// make sure the timer does not start until the start button is pushed - done
// make sure timer does not go into the negatives - done 


// when timer reaches 0, the pokemon image should be un-darkened and the name should be displayed - done 
// make the game restarts each time the button is pushed - done 

class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      seconds: 10
    }
  }

  startTimer() {
    this.fetchPokemon()

    this.myInterval = setInterval(() => {

      const { seconds } = this.state

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }
      if (seconds === 0) {
        this.componentWillUnmount()
      }

    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
    this.state.seconds = 10
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className={'wrapper'}>

        <h1 className={'timer'}>Guess the Pokémon!</h1>

        <button className={'start'} onClick={() => this.startTimer()}>Start!</button>

        <h1 className={'timer'}>{this.state.seconds} Seconds Left</h1>
        <div className={'pokeWrap'}>

        {this.state.seconds == 0
          ? <img className={'pokeImg1'} src={this.state.pokeSprite} />
          : <img className={'pokeImg'} src={this.state.pokeSprite} />
          }
      
          {this.state.seconds == 0
          ? <h1 className={'pokeName'}>{this.state.pokeName}</h1>
          : null
          }

        </div>
      </div>
    )
  }
}

export default PokeFetch;