import * as React from 'react';
import {
  StyleSheet, Image, ScrollView, View, Button,
} from 'react-native';

type Props = {
  title: string,
  onPress: () => void,
}

const ButtonCustom: React.FC<Props> = ({ title, onPress }) => (
  <Button title={title} onPress={() => onPress()} color="#841584" />
);

const styles = StyleSheet.create({
  Button: {

  },
});

export default ButtonCustom;
