/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Game from './Game';

type Props = {};
export default class App extends Component<Props> {
  state = {
    gameId: 1,
  };
  resetGame = () => {
    this.setState((prevState) => ({
      gameId: prevState.gameId + 1
    }));
  };
  render() {
    return (
      <Game key={this.state.gameId} 
        randomNumberCount={6} 
        initialSeconds={10} 
        onPlayAgain={this.resetGame}/>
    );
  }
}
