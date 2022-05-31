import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import IAuth from '../../types/IAuth';

type Props = {
  title?: string;
  sub?: string;
  bottomSheetModalRef?: React.RefObject<BottomSheetMethods>;
};

const Menu: React.FC<Props> = ({ title, sub, bottomSheetModalRef }) => {
  const navigation = useNavigation();
  const [name, setName] = React.useState('');
  // Refs and Memo

  const loadFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');

      if (value !== null) {
        const jsonValue = JSON.parse(value) as IAuth;

        setName(jsonValue.nome);
      }
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <View style={styles.Container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.Name}>{title || `Ola, ${name}!`}</Text>
        <Text style={styles.Sub}>{sub || 'Bem-vindo(a) novamente'}</Text>
      </View>

      <View style={styles.Icon}>
        <Pressable onPress={() => navigation.navigate('Avisos')}>
          <FontAwesomeIcon icon={faBell} size={25} color="black" />
        </Pressable>
      </View>
      <View style={styles.Icon}>
        <Pressable
          onPress={() => {
            if (bottomSheetModalRef) {
              bottomSheetModalRef.current?.snapToIndex(0);
            }
          }}
        >
          <FontAwesomeIcon icon={faBars} size={25} color="black" />
        </Pressable>
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
