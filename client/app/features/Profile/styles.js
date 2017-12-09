import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center'
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingVertical: 150,
    fontSize: 26,
    color: 'black'    
  },
  description: {
    fontSize: 16,
    paddingBottom: 20,
    color: 'black'
  },
  buttonGoToCatalogue: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'grey',
    paddingTop: 10
  },
});

export { styles };
