import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import IAuth from '../../types/IAuth';

import styles from './styles';

type Props = {
  title?: string;
  sub?: string;
  bottomSheetModalRef?: React.RefObject<BottomSheetMethods>;
};

const Menu: React.FC<Props> = ({ title, sub, bottomSheetModalRef }) => {
  const navigation = useNavigation();
  const [name, setName] = React.useState('');

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
        <Pressable onPress={() => navigation.navigate('Avisos' as never)}>
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

export default Menu;
