import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';

import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import LogoutSheet from '../../components/LogoutSheet/LogoutSheet';
import { useGet } from '../../hooks/useFetch';
import IViagens from '../../types/IViagens';

function Arquivos() {
  const navigation = useNavigation();
  const bottomSheetModalRef = React.useRef<BottomSheet>(null);
  const bottomSheetModalButtons = React.useRef<BottomSheet>(null);
  const [image, setImage] = React.useState<string>('');
  const [images, setImages] = React.useState<Array<string>>([]);
  const [hasPermission, setHasPermission] = React.useState<string>('');
  const snapPoints = React.useMemo(() => ['20%'], []);
  const [type, setType] = React.useState(CameraType.back);
  const [state, request] = useGet<Array<IViagens>>('http://www.coopertransc.com.br/api/public/api/minhasviagens/atual/{id}', false);

  React.useEffect(() => {
    console.log(state);
  }, [state]);

  React.useEffect(() => {
    loadIdFromUser();
  }, []);

  const loadIdFromUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');

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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImages((x) => [...x, result.uri]);
    }
  };

  const teste = async () => {
    const asd = await ImagePicker.launchCameraAsync();

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
          <Button title="Adicionar nova" onPress={() => bottomSheetModalButtons.current?.snapToIndex(0)} />
          <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
          }}
          >
            <ScrollView>
              <FlatList
                data={images}
                numColumns={2}
                scrollEnabled
                listKey="BrowseCategories"
                renderItem={({ item, index }) => (
                  <View style={{ margin: 5 }}>
                    <Image source={{ uri: item }} style={{ height: 250, width: 150 }} />
                  </View>
                )}
              />
            </ScrollView>
          </View>

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

        </>

      ) : (
        <>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Voce não possui nenhuma viagem ativa</Text>
          </View>
        </>
      )}
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
