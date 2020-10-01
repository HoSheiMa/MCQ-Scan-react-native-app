import {AsyncStorage} from 'react-native';
export async function _storeData(name, value) {
  try {
    await AsyncStorage.setItem(name, value);
    return true;
  } catch (error) {
    // Error saving data
    return false;
  }
}
export async function _retrieveData(name) {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      // We have data!!
      return value;
    } else {
      return false;
    }
  } catch (error) {
    // Error retrieving data
    return false;
  }
}
