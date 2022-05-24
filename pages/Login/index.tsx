import * as React from 'react';
import {
  StyleSheet, Image, Button, View,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SvgUri } from 'react-native-svg';
import Input from '../../components/Input';

const ImagemFundo = require('../../assets/images/logo.svg');

const ImagemFundoUri = Image.resolveAssetSource(ImagemFundo).uri;

function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
          <Button title="Entrar" onPress={() => navigation.navigate('MenuComp')} color="#00433E" />
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

export default Login;
