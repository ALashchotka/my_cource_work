import { StyleSheet } from 'react-native';
import { toRGBA } from '../../utils';

export const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: 'white'
  },
  formContainer: {
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
  emailInput: {
    marginTop: 10
  },
  passwordInput: {
    marginTop: 10
  },
  button: {
    backgroundColor: 'grey',
    paddingTop: 10
  },
  modal: {
    marginTop: 500,
    marginBottom: 100,
    marginHorizontal: 70
  },
  modalContent: {
    flex: 1,
    backgroundColor: toRGBA('white'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
