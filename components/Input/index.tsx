import * as React from 'react';
import {
  View, Text, StyleSheet, TextInput, KeyboardTypeOptions, Pressable,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  onChangeText: (text: string) => void;
  label: string;
  value: string;
  type?: KeyboardTypeOptions;
  placeholder?: string;
  isPassword?: boolean;
  isInvalid?: boolean;
  maxLength?: number;
};

const Login: React.FC<Props> = ({
  onChangeText, label, value, type, placeholder, isPassword, isInvalid, maxLength,
}) => {
  const [hidePass, setHidePass] = React.useState(true);

  return (
    <View style={styles.Container}>
      <Text style={styles.Label}>{label}</Text>

      <View style={!isInvalid ? styles.InputFull : styles.InputInvalid}>
        <TextInput
          style={styles.Input}
          value={value}
          keyboardType={type}
          maxLength={maxLength}
          secureTextEntry={isPassword && hidePass}
          placeholder={placeholder}
          onChangeText={(e) => onChangeText(e)}
        />
        {isPassword && (
          <Pressable onPress={() => setHidePass(!hidePass)}>
            <Icon
              name={hidePass ? 'eye-slash' : 'eye'}
              size={15}
              color="#00433E"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    padding: 10,
  },
  Input: {
    alignSelf: 'stretch',
    padding: 10,
    fontSize: 22,
    width: '90%',
  },

  Label: {
    marginBottom: 10,
    color: '#00433E',
    fontWeight: 'bold',
  },
  InputFull: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#00433E',
  },
  InputInvalid: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default Login;
