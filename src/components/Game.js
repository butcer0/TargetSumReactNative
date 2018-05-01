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
    selectedNumbers: [0,4],
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
      return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
    };
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.target}>{this.target}</Text>
          <View style={styles.randomContainer}>
            {this.randomNumbers.map((randomNumber, index) =>
              <RandomNumber key={index} number={randomNumber} 
                isSelected={this.isNumberSelected(index)}
              />
            )}
          </View>
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
    backgroundColor: '#bbb',
    margin: 50,
    textAlign: 'center',
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
