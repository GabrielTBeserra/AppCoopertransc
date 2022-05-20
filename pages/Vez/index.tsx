import * as React from 'react';
import {
  StyleSheet, ScrollView, Button, Text, View, SafeAreaView, FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGet } from '../../hooks/useFetch';
import IVez from '../../types/IVez';
import Header from '../../components/Header';
import VezCard from '../../components/VezCard';

function Ver() {
  const [vezList] = useGet<Array<IVez>>('http://www.coopertransc.com.br/intranet/api/src/public/vez', true);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.Container}>
      <Header title="Vez" sub="Pronto para engate imediato" />
      <FlatList
        data={vezList}
        style={{ width: '100%' }}
        numColumns={1}
        scrollEnabled
        renderItem={({ item, index }) => (
          <VezCard data={item} />
        )}
      />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Imagem: {
    height: 350,
  },
  loginButton: {
    margin: 10,
  },
  Inputs: {
    marginTop: 15,
  },
});

export default Ver;
