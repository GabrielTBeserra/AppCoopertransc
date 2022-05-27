import * as React from 'react';
import {
  StyleSheet, Text, View, FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGet } from '../../hooks/useFetch';
import Header from '../../components/Header';
import IAviso from '../../types/IAviso';
import AvisoCard from '../../components/AvisoCard';

function Avisos() {
  const navigation = useNavigation();
  const [avisos] = useGet<Array<IAviso>>('http://www.coopertransc.com.br/intranet/api/src/public/avisos', true, []);

  return (
    <View style={styles.Container}>
      <Header title="Avisos" sub=" " />
      <FlatList
        data={avisos}
        style={{ width: '100%' }}
        numColumns={1}
        scrollEnabled
        overScrollMode="always"
        renderItem={({ item, index }) => (
          <AvisoCard data={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

});

export default Avisos;
