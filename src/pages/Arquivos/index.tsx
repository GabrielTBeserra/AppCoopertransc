import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import axios from 'axios';

import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import LogoutSheet from '../../components/LogoutSheet/LogoutSheet';
import { useGet } from '../../hooks/useFetch';
import IViagens from '../../types/IViagens';
import MinhasViagensCard from '../../components/MinhasViagensCard/MinhasViagensCard';
import defaultApi from '../../common/base/service/mainApi';

function Arquivos() {
  const navigation = useNavigation();
  const bottomSheetModalRef = React.useRef<BottomSheet>(null);
  const bottomSheetModalButtons = React.useRef<BottomSheet>(null);
  const [image, setImage] = React.useState<string>('');
  const [images, setImages] = React.useState<Array<
    { uri: string, base64: string | undefined }>>([]);
  const [hasPermission, setHasPermission] = React.useState<string>('');
  const snapPoints = React.useMemo(() => ['20%'], []);
  const [type, setType] = React.useState(CameraType.back);
  const [state, request] = useGet<Array<IViagens>>('http://www.coopertransc.com.br/api/public/api/minhasviagens/atual/{id}', false, []);
  const [nonUse, requestFinish] = useGet('', false);

  React.useEffect(() => {
    console.log(state);
  }, [state]);

  React.useEffect(() => {
    loadIdFromUser();
  }, []);

  const loadIdFromUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      console.log(value);
      if (value !== null) {
        const jsonValue = JSON.parse(value);
        request(
          `http://www.coopertransc.com.br/api/public/api/minhasviagens/atual/${jsonValue.id}`,
        );
      }
    } catch (e) {
      // error reading value
    }
  };

  const finalizar = async () => {
    if (state) {
      await defaultApi.put(`http:www.coopertransc.com.br/api/public/api/minhasviagens/atual/${state[0].id}`, {
        Id: state[0].id,
        imagens: images.map((x) => x.base64),
      });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      base64: true,
    });

    bottomSheetModalButtons.current?.close();

    if (!result.cancelled) {
      setImage(result.uri);
      setImages((x) => [...x, { uri: result.uri, base64: result.base64 }]);
    }
  };

  const teste = async () => {
    const asd = await ImagePicker.launchCameraAsync({
      base64: true,
    });
    bottomSheetModalButtons.current?.close();

    if (!asd.cancelled) {
      setImages((x) => [...x, { uri: asd.uri, base64: asd.base64 }]);
    }

    console.log(asd);
  };

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === 'false') {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Finalizar viagem"
        sub=" "
        bottomSheetModalRef={bottomSheetModalRef}
      />

      {state && state.length > 0 ? (
        <>
          <ScrollView>
            <MinhasViagensCard
              data={{
                escolha: state[0].escolha,
                data_escolha: state[0].data_escolha,
                data_marcacao: state[0].data_marcacao,
                cidade_origem: state[0].cidade_origem,
                estado_destino: state[0].estado_destino,
                estado_origem: state[0].estado_origem,
                cidade_destino: state[0].cidade_destino,
                distancia: state[0].distancia,
              } as IViagens}
            />

            <View style={{
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            }}
            >

              <ScrollView>
                <FlatList
                  data={images}
                  numColumns={3}
                  scrollEnabled
                  listKey="BrowseCategories"
                  renderItem={({ item, index }) => (
                    <View style={{ margin: 5 }}>
                      <Image source={{ uri: item.uri }} style={{ height: 150, width: 80 }} />
                    </View>
                  )}
                />
              </ScrollView>
            </View>

            <View style={{ paddingHorizontal: 15 }}>
              <Button
                title="Adicionar arquivos"
                onPress={() => bottomSheetModalButtons.current?.snapToIndex(0)}
              />
            </View>

          </ScrollView>
        </>

      ) : (
        <>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Voce não possui nenhuma viagem ativa</Text>
          </View>
        </>
      )}
      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetModalButtons}
        enablePanDownToClose
        index={-1}
      >
        <BottomSheetView focusHook={useFocusEffect}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Pressable
              style={{
                backgroundColor: '#00433E',
                padding: 25,
                borderRadius: 100,
              }}
              onPress={teste}
            >
              <FontAwesomeIcon
                icon={faCamera}
                size={60}
                color="white"
              />

            </Pressable>
            <Pressable
              style={{
                backgroundColor: '#00433E',
                padding: 25,
                borderRadius: 100,
              }}
              onPress={pickImage}
            >
              <FontAwesomeIcon
                icon={faFolder}
                size={60}
                color="white"
              />
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
      <View style={{ paddingHorizontal: 15, marginBottom: 5 }}>
        <Button title="Finalizar Viagem" onPress={() => finalizar()} />
      </View>
      <LogoutSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default Arquivos;
