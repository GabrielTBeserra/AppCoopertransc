import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import * as React from 'react';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Pressable, View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  bottomSheetModalRef: React.RefObject<BottomSheetMethods>;
};

const LogoutSheet: React.FC<Props> = ({ bottomSheetModalRef }) => {
  const snapPoints = React.useMemo(() => ['15%'], []);
  const navigation = useNavigation();

  const loggout = async () => {
    await AsyncStorage.clear();
    bottomSheetModalRef.current?.close();
    navigation.navigate('Home');
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
              Sair da conta
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  LogoutSheet: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoggoutOpton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
    alignItems: 'center',
  },
});

export default LogoutSheet;
