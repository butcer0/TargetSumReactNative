import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

// TouchableOpacity
// TouchableHighlight

type Props = {};
export default class RandomNumber extends Component<Props> {
    static propTypes = {
      id: PropTypes.number.isRequired,
      number: PropTypes.number.isRequired,
      isDisabled: PropTypes.bool.isRequired,
      onPress: PropTypes.func.isRequired
    };
    handlePress = () => {
    //   console.log(this.props.number);
      if(!this.props.isDisabled)
      {
        this.props.onPress(this.props.id);
      }
      
    };

    render() {
      return (
      //Erik - 5/1/2018 this.props.isDisabled -> only add styles.selected if isDisabled is true (basically that the style exists and the prop is true)
        <TouchableOpacity onPress={this.handlePress}>
          <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>
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
  disabled: {
    opacity: 0.3,
  },
});
