import * as React from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, FlatList,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { useNavigation } from '@react-navigation/native';
import { useGet } from '../../hooks/useFetch';
import Header from '../../components/Header';
import IViagens from '../../types/IViagens';
import ViagensCard from '../../components/ViagensCard';

function Viagens() {
  const [viagensList, resendRequest] = useGet<Array<IViagens>>('http://www.coopertransc.com.br/intranet/api/src/public/viagens', true, []);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.Container}>
      <Header title="Viagens" sub="Relatório das últimas 48 horas" />
      <View style={styles.Datas}>
        <Text>De 27/04/2022</Text>
        <FontAwesomeIcon
          icon={faArrowRight}
          size={20}
          color="orange"
        />
        <Text>Até 27/04/2022</Text>
      </View>
      <FlatList
        data={viagensList}
        style={{ width: '100%' }}
        numColumns={1}
        scrollEnabled
        renderItem={({ item, index }) => (
          <ViagensCard data={item} />
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
  Datas: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    margin: 20,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
    color: '#00433E',
  },
});

export default Viagens;
