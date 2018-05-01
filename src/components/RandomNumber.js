import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

// TouchableOpacity
// TouchableHighlight

type Props = {};
export default class RandomNumber extends Component<Props> {
    static propTypes = {
      number: PropTypes.number.isRequired,
      isSelected: PropTypes.bool.isRequired,
    };
    handlePress = () => {
    //   console.log(this.props.number);

    };

    render() {
      return (
      //Erik - 5/1/2018 this.props.isSelected -> only add styles.selected if isSelected is true (basically that the style exists and the prop is true)
        <TouchableOpacity onPress={this.handlePress}>
          <Text style={[styles.random, this.props.isSelected && styles.selected]}>
            {this.props.number}
          </Text>
        </TouchableOpacity>
      );
    }
}

const styles = StyleSheet.create({
  random: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
  selected: {
    opacity: 0.3,
  },
});
