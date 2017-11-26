import { AsyncStorage } from 'react-native';

export async function getStorageValue(token) {
  let item;
  try {
    item = await AsyncStorage.getItem(token);
  } catch (error) {
    console.warn(error);
  }
  return item;
}

export async function setStorageValue(key, value) {
  let item;
  try {
    item = await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.warn(error);
  }
  return item;
}
