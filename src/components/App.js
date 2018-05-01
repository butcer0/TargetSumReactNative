/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Game from './Game';

const INITIAL_NUMBERCOUNT = 5;
const INITIAL_SECONDS = 10;
const NUMBER_INCR = 2;
const TIME_DECR = 2;

type Props = {};
export default class App extends Component<Props> {
  //Private Fields
  numberCount = INITIAL_NUMBERCOUNT;
  numSeconds = INITIAL_SECONDS;
  wins = 0;
  losses = 0;
  score = 0;

  state = {
    gameId: 1,
  };

  resetGame = () => {
  
    this.setState((prevState) => ({
      gameId: prevState.gameId + 1
    }));
  };

  gameComplete = (completeGameStatus) => {
    console.log('Game Complete Called: ' + completeGameStatus);
    this.updateScore(completeGameStatus);
    this.updateDifficulty();
  }

  updateScore = (completeGameStatus) => {
    if(completeGameStatus === 'WON') {
      this.wins += 1;
    } else if(completeGameStatus === 'LOST') {
      this.losses += 1;
    } else {
      //Erik - 5/1/2018 This shouldn't happen
    }
    this.score = this.wins;
    console.log('Score Updated: ' + this.score);
  };

  updateDifficulty = () => {
    const netScore = this.wins - this.losses;
    if(netScore <= 0) {
      this.numberCount = INITIAL_NUMBERCOUNT;
      this.numSeconds = INITIAL_SECONDS;
    } else {
      this.numberCount = INITIAL_NUMBERCOUNT + (Math.ceil(netScore / 5) * NUMBER_INCR);
      this.numSeconds = INITIAL_SECONDS - (Math.ceil(netScore / 5) * TIME_DECR);
    }

    console.log(`Difficulty Updated - Number: ${this.numberCount} Time: ${this.numSeconds}`);
  };

  // resetGame = () => {
  //   this.setState((prevState) => ({
  //     gameId: prevState.gameId + 1
  //   }));
  // };
  render() {
    return (
      <Game key={this.state.gameId} 
        randomNumberCount={this.numberCount} 
        initialSeconds={this.numSeconds} 
        onPlayAgain={this.resetGame}
        onGameComplete={this.gameComplete}
        score={this.score}/>
    );
  }
}
