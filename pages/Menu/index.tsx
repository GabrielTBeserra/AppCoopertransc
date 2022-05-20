import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  StyleSheet, FlatList, View, Pressable,
} from 'react-native';
import MenuCard from '../../components/MenuCard';

import Header from '../../components/Header';
import menu from './menu';

function Menu() {
  const navigation = useNavigation();

  return (
    <View style={styles.Container}>
      <Header />
      <FlatList
        data={menu}
        numColumns={2}
        scrollEnabled={false}
        listKey="BrowseCategories"
        renderItem={({ item, index }) => (
          <Pressable onPress={() => navigation.navigate(item.navigateTo)}>

            <MenuCard title={item.name} icon={item.icon} />
          </Pressable>
        )}
      />
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

export default Menu;
