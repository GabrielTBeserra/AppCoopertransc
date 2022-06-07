import React, {
  useMemo, useRef, useState, useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Button,
} from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { useFocusEffect } from '@react-navigation/native';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import IViagens from '../../types/IViagens';
import MinhasViagensCard from '../../components/MinhasViagensCard/MinhasViagensCard';
import { usePost } from '../../hooks/useFetch';
import { Estados } from '../../common/base/infos/Arrays';
import LogoutSheet from '../../components/LogoutSheet/LogoutSheet';

type Post = {
  data_inicio: string;
  data_fim: string;
  estado: string;
  id: string;
};

function MinhasViagens() {
  const [id, setId] = useState('');
  const [viagensList, resendRequest] = usePost<Post, Array<IViagens>>(
    {
      data_inicio: '01/03/2021',
      data_fim: '30/03/2022',
      estado: '',
      id: `${id}`,
    },
    'http://www.coopertransc.com.br/api/public/api/minhasviagens',
    false,
    [],
  );

  useEffect(() => {
    loadIdFromUser();
  }, []);

  const loadIdFromUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');

      if (value !== null) {
        const jsonValue = JSON.parse(value);
        setId(jsonValue.id);
      }
    } catch (e) {
      // error reading value
    }
  };

  // Refs and Memo
  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const bottomSheetModalRefHeader = React.useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%'], []);

  // States
  const [estadosOpen, setEstadosOpen] = useState(false);
  const [estado, setEstado] = useState('');
  const [dataInicio, setDataInicio] = useState(
    moment().subtract(1, 'month').toDate(),
  );
  const [dataFinal, setDataFinal] = useState(new Date());

  // Functions
  const onChangeInicio = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate) {
      setDataInicio(selectedDate);
    }
  };

  const onChangeFinal = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate) {
      setDataFinal(selectedDate);
    }
  };

  const filter = () => {
    resendRequest({
      data_inicio: moment(dataInicio).format('DD/MM/YYYY'),
      data_fim: moment(dataFinal).format('DD/MM/YYYY'),
      estado,
      id: `${id}`,
    });

    bottomSheetModalRef.current?.close();
  };

  const showDataInicioPicker = () => {
    DateTimePickerAndroid.open({
      value: dataInicio,
      onChange: onChangeInicio,
      mode: 'date',
      is24Hour: true,
      maximumDate: dataFinal,
    });
  };

  const showDataFinalPicker = () => {
    DateTimePickerAndroid.open({
      value: dataFinal,
      onChange: onChangeFinal,
      mode: 'date',
      is24Hour: true,
      maximumDate: new Date(),
    });
  };

  return (
    <SafeAreaView style={styles.Container}>
      <Header
        title="Minhas Viagens"
        sub=" "
        bottomSheetModalRef={bottomSheetModalRefHeader}
      />
      <View style={styles.FilterHeader}>
        <Pressable
          onPress={() => {
            bottomSheetModalRef.current?.snapToIndex(0);
          }}
        >
          <FontAwesomeIcon icon={faFilter} size={20} color="#00433E" />
        </Pressable>

        <Text style={{ marginLeft: 15 }}>Filtrar</Text>
      </View>
      {viagensList && viagensList?.length > 0 ? (
        <FlatList
          data={viagensList}
          style={{ width: '100%' }}
          numColumns={1}
          scrollEnabled
          renderItem={({ item, index }) => <MinhasViagensCard data={item} />}
        />
      ) : (
        <View style={styles.NotRegister}>
          <Text>Não há registros para o filtro selecionado.</Text>
        </View>
      )}

      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetModalRef}
        enablePanDownToClose
      >
        <BottomSheetView focusHook={useFocusEffect}>
          <View style={styles.DropDownSeparator}>
            <View style={styles.Header}>
              <Text style={styles.HeaderText}>Filtrar por:</Text>
            </View>
            <View style={styles.Date}>
              <Pressable onPress={() => showDataInicioPicker()}>
                <Text style={styles.LabelText}>Data Inicio:</Text>
                <Text style={styles.CommonText}>
                  {moment(dataInicio).format('DD/MM/YYYY')}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.DropDownSeparator}>
            <View style={styles.Date}>
              <Pressable onPress={() => showDataFinalPicker()}>
                <Text style={styles.LabelText}>Data Inicio:</Text>
                <Text style={styles.CommonText}>
                  {moment(dataFinal).format('DD/MM/YYYY')}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.DropDownSeparator}>
            <View style={styles.EstadosContainer}>
              <DropDownPicker
                open={estadosOpen}
                value={estado}
                items={Estados}
                setOpen={setEstadosOpen}
                listMode="MODAL"
                placeholder="Estado"
                setValue={setEstado}
                style={styles.Estados}
                autoScroll
                textStyle={{ color: '#00433E' }}
                closeAfterSelecting
                zIndex={100}
                zIndexInverse={500}
              />
            </View>
          </View>
          <View style={styles.FilterButton}>
            <Button onPress={() => filter()} title="Filtrar" color="#00433E" />
          </View>
        </BottomSheetView>
      </BottomSheet>
      <LogoutSheet bottomSheetModalRef={bottomSheetModalRefHeader} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  CommonText: {
    color: '#00433E',
  },
  LabelText: {
    color: '#00433E',
    fontSize: 17,
    marginBottom: 5,
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
  ModalContent: {
    flex: 1,
  },
  Header: {
    paddingHorizontal: 25,
  },
  ModalInternContent: {
    backgroundColor: 'red',
  },
  modalContent: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'auto',
    margin: '5%',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  HeaderText: {
    fontSize: 25,
    color: '#005c56',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  SheetContent: {
    margin: 15,
    zIndex: 1000,
  },
  DropDownSeparator: {
    marginTop: 15,
  },
  Date: {
    borderColor: 'black',
    padding: 10,
    marginHorizontal: 15,
    borderWidth: 2,
    borderBottomColor: '#00433E',
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  Estados: {
    borderRadius: 2,
    borderWidth: 2,
    borderBottomColor: '#00433E',
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  EstadosContainer: {
    marginHorizontal: 15,
  },
  FilterButton: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  NotRegister: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MinhasViagens;
