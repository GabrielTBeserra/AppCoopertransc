import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import styles from './styles';

const Card: FC = ({ children }) => (
  <View style={styles.Card}>
    <>{children}</>
  </View>
);

export default Card;
