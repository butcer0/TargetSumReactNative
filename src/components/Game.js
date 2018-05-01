import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

type Props = {};
export default class Game extends Component<Props> {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
  };
  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
  };
  gameStatus = 'PLAYING';
  randomNumbers = Array
    .from({ length: this.props.randomNumberCount})
    .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
      .slice(0, this.props.randomNumberCount - 2)
      .reduce((acc, curr) => acc + curr, 0);
      //TODO: Shuffle the random numbers
    shuffledrandomNumbers = shuffle(this.randomNumbers);
    
    componentDidMount() {
      //Erik - 5/1/2018 setInterval is async timer
      //Erik - 5/1/2018 The second function takes is a '.then()' that takes a conditional
      //Erik - 5/1/2018 The interval method returns its Id
      this.intervalId = setInterval(() => {
        this.setState((prevState) => ({
          remainingSeconds: prevState.remainingSeconds - 1,
        }), () => {
          if (this.state.remainingSeconds === 0) {
            clearInterval(this.intervalId);
          }
        });
      }, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.intervalId);
    }

    isNumberSelected = (numberIndex) => {
      //Erik - 5/1/2018 If number doesn't exist return -1, so false
      return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };
    selectNumber = (numberIndex) => {
      console.log('Pressed ' + numberIndex);
      //Erik - 5/1/2018 The arrow function naturally returns the return value of the function
      this.setState((prevState) => ({
        //Erik - 5/1/2018 Copy previous selected numbers and add new index, this keeps state immuatable
        selectedIds: [...prevState.selectedIds, numberIndex],
      }));
    };
 
    //Erik - 5/1/2018 Before next loop, determine if the selectedIds has updated or ran out of time then update cached gameStatus
    componentWillUpdate(nextProps, nextState) {
      if(nextState.selectedIds !== this.state.selectedIds 
        || nextState.remainingSeconds === 0)
      {
        //Erik - 5/1/2018 This would be wrong bc it would be calculating on current (previous) state
        // this.gameStatus = this.calcGameStatus();
        this.gameStatus = this.calcGameStatus(nextState);
        if(this.gameStatus != 'PLAYING')
        {
          clearInterval(this.intervalId);
        }
      } 
    }

  // gameStatus: PLAYING, WON, LOST
  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledrandomNumbers[curr];
    },0);
    //Erik - 5/1/2018 Shows on device
    // console.warn('Current Sum: '+sumSelected);
    // console.log('Current Sum: '+sumSelected);
    if(sumSelected > this.target
      || nextState.remainingSeconds <= 0) {
      return 'LOST';
    }
    if(sumSelected < this.target) {
      return 'PLAYING';
    }
    if(sumSelected == this.target) {
      return 'WON';
    }
  }  

  //Erik - 5/1/2018 This would have calculated previous state when using componentWillUpdate
  // calcGameStatus = () => {
  //   const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
  //     return acc + this.randomNumbers[curr];
  //   },0);
  //     //Erik - 5/1/2018 Shows on device
  //     // console.warn('Current Sum: '+sumSelected);
  //     // console.log('Current Sum: '+sumSelected);
  //   if(sumSelected > this.target
  //       || this.state.remainingSeconds <= 0) {
  //     return 'LOST';
  //   }
  //   if(sumSelected < this.target) {
  //     return 'PLAYING';
  //   }
  //   if(sumSelected == this.target) {
  //     return 'WON';
  //   }
  // }
    
  render() {
    // const gameStatus = this.gameStatus;
    return (
    //Erik - 5/1/2018 Use dynamic string to select the correct class
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${this.gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.shuffledrandomNumbers.map((randomNumber, index) =>
            <RandomNumber 
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={this.isNumberSelected(index) || this.gameStatus !== 'PLAYING'}
              onPress={this.selectNumber}
            />
          )}
        </View>
        <Text>{this.gameStatus}</Text>
        <Text>{this.state.remainingSeconds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({  
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 30,
  },
  target: {
    fontSize: 50,
    
    margin: 50,
    textAlign: 'center',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  STATUS_PLAYING: {
    backgroundColor: '#bbb',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});
