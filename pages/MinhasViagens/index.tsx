import React, {
  useMemo, useRef, useState,
} from 'react';

import {
  StyleSheet, Text, View, SafeAreaView, FlatList, Pressable,

} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';

import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetVirtualizedList,
} from '@gorhom/bottom-sheet';

import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import IViagens from '../../types/IViagens';
import MinhasViagensCard from '../../components/MinhasViagensCard/MinhasViagensCard';
import { usePost } from '../../hooks/useFetch';
import { Estados } from '../../common/base/infos/Arrays';

type Post = {
  data_inicio: string,
  data_fim: string,
  estado_destino: string,
  id: string
}

function MinhasViagens() {
  const [viagensList, resendRequest] = usePost<Post, Array<IViagens>>(
    {
      data_inicio: '01/03/2021',
      data_fim: '30/03/2022',
      estado_destino: '',
      id: '13',
    },
    'http://www.coopertransc.com.br/intranet/api/src/public/minhasviagens',
    true,
  );

  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const [estadosOpen, setEstadosOpen] = useState(false);
  const [estado, setEstado] = useState(null);
  const [periodo, setPeriodo] = useState('1');
  const [bottomIsOpen, setBottomIsOpen] = useState(-1);
  const [periodoOpen, setPeriodoOpen] = useState(false);
  const periodos = [
    { label: 'Dia', value: '1' },
    { label: 'Período', value: '2' },
  ];

  return (

    <SafeAreaView style={styles.Container}>
      <Header title="Minhas Viagens" sub="asjkdnaoisdn" />
      <View style={styles.FilterHeader}>
        <Pressable onPress={() => {
          bottomSheetModalRef.current?.snapToIndex(0);
        }}
        >
          <FontAwesomeIcon
            icon={faFilter}
            size={20}
            color="#00433E"
          />
        </Pressable>

        <Text style={{ marginLeft: 15 }}>
          Filtrar
        </Text>

      </View>
      <FlatList
        data={[]}
        style={{ width: '100%' }}
        numColumns={1}
        scrollEnabled
        renderItem={({ item, index }) => (
          <MinhasViagensCard data={item} />
        )}
      />

      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetModalRef}
        enablePanDownToClose
        index={-1}
      >
        <BottomSheetView focusHook={useFocusEffect}>
          <View style={styles.SheetContent}>
            <Text>Filtrar Por</Text>
            <View style={styles.DropDownSeparator}>
              <DropDownPicker
                open={periodoOpen}
                value={periodo}
                items={periodos}
                setOpen={setPeriodoOpen}
                setValue={setPeriodo}
                onOpen={() => setEstadosOpen(false)}
                style={{ borderRadius: 2 }}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
            {
              periodo === '1' ? (
                <View style={styles.DropDownSeparator}>
                  <Text>Dia</Text>
                </View>
              ) : (
                <>
                  <Text>Inicio</Text>
                  <Text>Fim</Text>
                </>
              )
            }

            <View style={styles.DropDownSeparator}>
              <DropDownPicker
                open={estadosOpen}
                value={estado}
                items={Estados}
                setOpen={setEstadosOpen}
                listMode="MODAL"
                placeholder="Estado"
                onOpen={() => setPeriodoOpen(false)}
                setValue={setEstado}
                style={{ borderRadius: 2 }}
                autoScroll
                closeAfterSelecting
                zIndex={100}
                zIndexInverse={500}
              />

            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>

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
  ModalContent: {
    flex: 1,
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
});

export default MinhasViagens;
