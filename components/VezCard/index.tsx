import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  StyleSheet, FlatList, View, Pressable, Text,
} from 'react-native';
import IVez from '../../types/IVez';
import Card from '../Card';

type Props = {
  data: IVez
}

const VezCard: React.FC<Props> = ({ data }) => {
  const navigation = useNavigation();

  return (
    <Card>
      <Text style={styles.Title}>{data.cooperado.toUpperCase()}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    margin: 10,
  },
  Inputs: {
    marginTop: 15,
  },
  Title: {
    color: '#00433E',
    fontSize: 14,
  },
});

export default VezCard;
