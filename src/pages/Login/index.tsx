import * as React from 'react';
import axios from 'axios';
import { StyleSheet, Image, Button,      View, SafeAreaView } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IAuth from '../../types/IAuth';
import Input from '../../components/Input';
import loginAPi from '../../common/base/service/loginApi';

const ImagemFundo = require('../../assets/images/logo.svg');

const ImagemFundoUri = Image.resolveAssetSource(ImagemFundo).uri;

function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [Invalid, setInvalid] = React.useState(false);

  // useFocusEffect(() => {
  //   setEmail('');
  //   setPassword('');
  // });

  const Login = async () => {
    try {
      const response = await loginAPi.post<IAuth>(
        'http://www.coopertransc.com.br/api/public/api/login',
        {
          username: email,
          password,
        }
      );

      await AsyncStorage.setItem('@storage_Key', JSON.stringify(response.data));
      navigation.navigate('MenuComp');
    } catch (e) {
      setInvalid(true);
    }
  };

  const loadFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');

      if (value !== null) {
        navigation.navigate('MenuComp');
      }
    } catch (e) {
      // error reading value
    }
  };

  useFocusEffect(() => {
    loadFromStorage();
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.Logo}>
        <SvgUri
          uri={ImagemFundoUri}
          scaleX={0.3}
          scaleY={0.3}
          style={{ flex: 1 }}
        />
      </View>

      <View style={styles.Inputs}>
        <Input
          value={email}
          label="CPF / CNPJ"
          type="numeric"
          placeholder="000.000.000-00"
          onChangeText={(text: string) => {
            setEmail(text);
          }}
          isInvalid={Invalid}
          maxLength={14}
        />
        <Input
          value={password}
          label="Senha"
          isPassword
          placeholder="*********"
          onChangeText={(text: string) => {
            setPassword(text);
          }}
          isInvalid={Invalid}
        />
        <View style={styles.loginButton}>
          <Button
            title="Entrar"
            onPress={() => Login()}
            color="#00433E"
            disabled={!password && !email}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Imagem: {
    resizeMode: 'cover',
  },
  loginButton: {
    margin: 10,
  },
  Logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  Inputs: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
});

export default LoginScreen;
