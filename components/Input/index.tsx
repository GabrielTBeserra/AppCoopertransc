import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  Pressable,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

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
  onChangeText,
  label,
  value,
  type,
  placeholder,
  isPassword,
  isInvalid,
  maxLength,
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
          onChangeText={e => onChangeText(e)}
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

export default Login;
