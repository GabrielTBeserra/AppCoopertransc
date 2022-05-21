import * as React from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, FlatList,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { useNavigation } from '@react-navigation/native';
import { useGet } from '../../hooks/useFetch';
import Header from '../../components/Header';
import IViagens from '../../types/IViagens';
import MinhasViagensCard from '../../components/MinhasViagensCard/MinhasViagensCard';

function MinhasViagens() {
  const [viagensList, resendRequest] = useGet<Array<IViagens>>('http://www.coopertransc.com.br/intranet/api/src/public/viagens', true, []);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.Container}>
      <Header title="Minhas Viagens" sub="asjkdnaoisdn" />
      <View style={styles.FilterHeader}>
        <FontAwesomeIcon
          icon={faFilter}
          size={20}
          color="#00433E"
        />
        <Text style={{ marginLeft: 15 }}>
          Filtrar
        </Text>
      </View>
      <FlatList
        data={viagensList}
        style={{ width: '100%' }}
        numColumns={1}
        scrollEnabled
        renderItem={({ item, index }) => (
          <MinhasViagensCard data={item} />
        )}
      />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
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
  FilterHeader: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 5,
    margin: 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
    color: '#00433E',
  },
});

export default MinhasViagens;
