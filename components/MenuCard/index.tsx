import { StatusBar } from 'expo-status-bar';
import { Component, FC } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const ImagemFundo = require('../../assets/images/teste.jpg');

const ImagemFundoUri = Image.resolveAssetSource(ImagemFundo).uri;

type Props = {
  title: string;
  icon: IconProp;
};

const MenuCard: FC<Props> = ({ children, icon, title }) => (
  <View style={styles.BoxContainer}>
    <View style={styles.Box}>
      <FontAwesomeIcon icon={icon} size={35} color="white" />
    </View>
    <Text style={styles.Title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  BoxContainer: {
    borderRadius: 20,
    alignItems: 'center',
    margin: 25,
  },
  Box: {
    width: 110,
    height: 85,
    borderRadius: 20,
    backgroundColor: '#00433E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#00433E',
  },
  Image: {
    alignSelf: 'stretch',
    resizeMode: 'contain',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 102,
    flexDirection: 'row',
    margin: 10,
    padding: 25,
  },
});

export default MenuCard;
