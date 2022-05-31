import * as React from 'react';
import {
  StyleSheet, Text, View, SafeAreaView, FlatList,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import BottomSheet from '@gorhom/bottom-sheet';
import { useGet } from '../../hooks/useFetch';
import Header from '../../components/Header';
import IViagens from '../../types/IViagens';
import ViagensCard from '../../components/ViagensCard';
import LogoutSheet from '../../components/LogoutSheet/LogoutSheet';

function Viagens() {
  const [viagensList, resendRequest] = useGet<Array<IViagens>>('http://www.coopertransc.com.br/api/public/api/viagens', true, []);
  const navigation = useNavigation();
  const bottomSheetModalRef = React.useRef<BottomSheet>(null);

  return (
    <SafeAreaView style={styles.Container}>
      <Header title="Viagens" sub="Relatório das últimas 48 horas" bottomSheetModalRef={bottomSheetModalRef} />
      <View style={styles.Datas}>
        <Text>
          De
          {' '}
          {moment().subtract(2, 'days').format('DD/MM/YYYY')}
        </Text>
        <FontAwesomeIcon
          icon={faArrowRight}
          size={20}
          color="orange"
        />
        <Text>
          Até
          {' '}
          {moment().format('DD/MM/YYYY')}
        </Text>
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
      <LogoutSheet bottomSheetModalRef={bottomSheetModalRef} />
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
