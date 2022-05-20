import * as React from 'react';
import {
  StyleSheet, Image, ScrollView, Button, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';

const ImagemFundo = require('../../assets/images/teste.jpg');

const ImagemFundoUri = Image.resolveAssetSource(ImagemFundo).uri;

function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ScrollView style={styles.Container}>
      <Image source={{ uri: ImagemFundoUri }} style={styles.Imagem} />

      <View style={styles.Inputs}>

        <Input
          value={email}
          label="CPF / CNPJ"
          type="numeric"
          placeholder="000.000.000-00"
          onChangeText={(text: string) => {
            setEmail(text);
          }}
        />
        <Input
          value={password}
          label="Senha"
          isPassword
          placeholder="*********"
          onChangeText={(text: string) => {
            setPassword(text);
          }}
        />
        <View style={styles.loginButton}>
          <Button title="Entrar" onPress={() => navigation.navigate('Menu')} color="#00433E" />
        </View>
      </View>
    </ScrollView>
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
});

export default Login;
