import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center'
  },
  pickers: {
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)'
  },
  picker: {
    marginHorizontal: 30,
    height: 40,
    width: 150
  },
  catalogue: {
    paddingVertical: 30,
    marginBottom: 50
  }
});

export { styles };
