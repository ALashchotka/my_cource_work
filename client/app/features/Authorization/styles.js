import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

export const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },
  formContainer: {
    marginTop: 150,
    marginHorizontal: 50,
    paddingBottom: 100
  },
  textCenter: {
    textAlign: 'center',
    padding: 5
  },
  buttonGroup: {
    marginTop: 40
  },
  logoImage: {
    width: 200,
    height: 200
  },
  input: {
    marginTop: 10
  },
  button: {
    backgroundColor: 'grey',
    paddingTop: 10
  }
});
