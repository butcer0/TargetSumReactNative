import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';


type Props = {};
export default class RandomNumber extends Component<Props> {
  static propTypes = {
    number: PropTypes.number.isRequired
  };
  render() {
    return (
      <Text style={styles.random}>{this.props.number}</Text>
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
    textAlign: 'center'    
  },
});
