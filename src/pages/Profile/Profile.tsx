import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  StyleSheet, View, Pressable,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MenuCard from '../../components/MenuCard';

import Header from '../../components/Header';
import LogoutSheet from '../../components/LogoutSheet/LogoutSheet';

function Profile() {
  const navigation = useNavigation();
  const bottomSheetModalRef = React.useRef<BottomSheet>(null);

  return (
    <View style={styles.Container}>
      <Header bottomSheetModalRef={bottomSheetModalRef} />

      <LogoutSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    margin: 10,
  },
  Inputs: {
    marginTop: 15,
  },
});

export default Profile;
