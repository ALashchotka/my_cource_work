import { AsyncStorage } from 'react-native';

export async function getStorageValue(token) {
  try {
    return await AsyncStorage.getItem(token);
  } catch (error) {
    console.warn(error);
  }
}

export async function setStorageValue(key, value) {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.warn(error);
  }
}
