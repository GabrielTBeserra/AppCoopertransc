import { StatusBar } from 'expo-status-bar';
import { Component, FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Card: FC = ({ children }) => (
  <View style={styles.Card}>
    <>{children}</>
  </View>
);

const styles = StyleSheet.create({
  Card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
    alignSelf: 'stretch',
    padding: 10,
    margin: 10,
  },
});

export default Card;
