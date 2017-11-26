import { StyleSheet } from 'react-native';

const MARGIN_HORIZONTAL_VALUE = 50;

export const styles = StyleSheet.create({
  root: {
    height: '100%',
    backgroundColor: 'white',
  },
  logoContainer: {
    padding: 50,
    alignItems: 'center',
  },
  formContainer: {
    marginLeft: MARGIN_HORIZONTAL_VALUE,
    marginRight: MARGIN_HORIZONTAL_VALUE,
    paddingBottom: 100,
  },
  textCenter: {
    textAlign: 'center',
    padding: 5,
  },
  buttonGroup: {
    marginTop: 40,
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  emailInput: {
    marginTop: 10,
  },
  passwordInput: {
    marginTop: 10,
  },
  logInButton: {
    marginTop: 10,
  },
  signUpButton: {
    paddingTop: 10,
  },
});
