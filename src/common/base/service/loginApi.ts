import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Button, Alert } from 'react-native';

const loginAPi = axios.create();

loginAPi.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      Alert.alert('CPF ou senha incorretos');
    }
    Promise.reject(error);
  }
);

export default loginAPi;
