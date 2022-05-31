import * as React from 'react';
import {
  StyleSheet, SafeAreaView, FlatList, View, Text,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import BottomSheet from '@gorhom/bottom-sheet';
import { useGet } from '../../hooks/useFetch';
import IVez from '../../types/IVez';
import Header from '../../components/Header';
import VezCard from '../../components/VezCard/VezCard';
import Classify from '../../workers/VeiculoClassify';
import LogoutSheet from '../../components/LogoutSheet/LogoutSheet';

function Ver() {
  const [vezList] = useGet<Array<IVez>>('http://www.coopertransc.com.br/api/public/api/vez', true);
  const [listaClissificada, setListaClissificada] = React.useState<Array<IVez>>([]);
  const bottomSheetModalRef = React.useRef<BottomSheet>(null);

  React.useEffect(() => {
    if (vezList) {
      if (vezList.length > 0) {
        const lista = Classify(vezList);
        setListaClissificada(lista);
      }
    }
  }, [vezList]);

  return (
    <SafeAreaView style={styles.Container}>
      <Header title="Vez" sub="Disponível para Carregamento Imediato" bottomSheetModalRef={bottomSheetModalRef} />
      <View style={styles.HeaderInfo}>
        <View style={styles.Icon}>
          <FontAwesomeIcon
            icon={faCircle}
            size={20}
            color="#00AC00"
          />
          <Text style={styles.AjustText}>Truck</Text>
        </View>
        <View style={styles.Icon}>
          <FontAwesomeIcon
            icon={faCircle}
            size={20}
            color="#FFF000"
          />
          <Text style={styles.AjustText}>Carreta</Text>
        </View>
        <View style={styles.Icon}>
          <FontAwesomeIcon
            icon={faCircle}
            size={20}
            color="#5F95F0"
          />
          <Text style={styles.AjustText}>Bitrem</Text>
        </View>
      </View>
      <FlatList
        data={listaClissificada}
        style={{ width: '100%' }}
        numColumns={1}
        scrollEnabled
        renderItem={({ item }) => (
          <VezCard data={item} />
        )}
      />
      <LogoutSheet bottomSheetModalRef={bottomSheetModalRef} />
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
  HeaderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    margin: 20,
    padding: 15,
    backgroundColor: 'white',
  },
  Icon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  AjustText: {
    marginLeft: 5,
  },
});

export default Ver;
