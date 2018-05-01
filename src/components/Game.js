import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

type Props = {};
export default class Game extends Component<Props> {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  state = {
    selectedIds: [],
  };
  randomNumbers = Array
    .from({ length: this.props.randomNumberCount})
    .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
      .slice(0, this.props.randomNumberCount - 2)
      .reduce((acc, curr) => acc + curr, 0);
      //TODO: Shuffle the random numbers
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
  // gameStatus: PLAYING, WON, LOST
    gameStatus = () => {
      const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
        return acc + this.randomNumbers[curr];
      },0);
      //Erik - 5/1/2018 Shows on device
      // console.warn('Current Sum: '+sumSelected);
      // console.log('Current Sum: '+sumSelected);
      if(sumSelected < this.target) {
        return 'PLAYING';
      }
      if(sumSelected == this.target) {
        return 'WON';
      }
      if(sumSelected > this.target) {
        return 'LOST';
      }
    }
    
    render() {
      const gameStatus = this.gameStatus();
      return (
        //Erik - 5/1/2018 Use dynamic string to select the correct class
        <View style={styles.container}>
          <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
            {this.target}
          </Text>
          <View style={styles.randomContainer}>
            {this.randomNumbers.map((randomNumber, index) =>
              <RandomNumber 
                key={index}
                id={index}
                number={randomNumber}
                isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
                onPress={this.selectNumber}
              />
            )}
          </View>
          <Text>{gameStatus}</Text>
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
