import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Button, Alert } from 'react-native';

const defaultApi = axios.create();

defaultApi.interceptors.request.use(async request => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key');

    if (value !== null) {
      const jsonValue = JSON.parse(value);

      if (request.headers) {
        request.headers.authorization = `Bearer ${jsonValue.token}`;
      }
    }
  } catch (e) {
    // error reading value
  }

  return request;
});

defaultApi.interceptors.response.use(
  response => response,
  error => {
    Promise.reject(error);
  }
);

export default defaultApi;
