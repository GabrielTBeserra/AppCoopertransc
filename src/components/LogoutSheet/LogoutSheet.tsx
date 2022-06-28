import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as React from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Pressable, View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

type Props = {
  bottomSheetModalRef: React.RefObject<BottomSheetMethods>;
};

const LogoutSheet: React.FC<Props> = ({ bottomSheetModalRef }) => {
  const snapPoints = React.useMemo(() => ['15%'], []);
  const navigation = useNavigation();

  const loggout = async () => {
    await AsyncStorage.clear();
    bottomSheetModalRef.current?.close();
    navigation.navigate('Home' as never);
  };

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={bottomSheetModalRef}
      enablePanDownToClose
      index={-1}
    >
      <BottomSheetView focusHook={useFocusEffect}>
        <View style={styles.LogoutSheet}>
          <Pressable onPress={() => loggout()} style={styles.LoggoutOpton}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size={20}
              color="#006600"
            />
            <Text
              style={{
                color: '#006600',
                fontSize: 20,
                textDecorationColor: 'green',
                marginLeft: 5,
              }}
            >
              Sair
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default LogoutSheet;
