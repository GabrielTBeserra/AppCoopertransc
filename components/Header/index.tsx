import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import * as React from 'react';
import {
  Pressable, StyleSheet, Text, View,
} from 'react-native';

type Props = {
  title?: string
  sub?: string
}

const Menu: React.FC<Props> = ({ title, sub }) => {
  const navigation = useNavigation();

  return (
    <View
      style={styles.Container}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.Name}>{title || 'Ola, Nome Teste!'}</Text>
        <Text style={styles.Sub}>
          {sub || 'Bem-vindo(a) novamente'}
        </Text>
      </View>

      <View style={styles.Icon}>
        <Pressable onPress={() => navigation.navigate('Avisos')}>
          <FontAwesomeIcon
            icon={faBell}
            size={25}
            color="black"
          />
        </Pressable>
      </View>
      <View style={styles.Icon}>
        <FontAwesomeIcon
          icon={faBars}
          size={25}
          color="black"
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
    margin: 15,
  },
  loginButton: {
    margin: 10,
  },
  Inputs: {
    marginTop: 15,
  },
  Name: {
    color: '#00433E',
    fontSize: 23,
    fontWeight: 'bold',
  },
  Sub: {
    color: 'gray',
    fontSize: 13,
  },
  Icon: { margin: 5 },
});

export default Menu;
