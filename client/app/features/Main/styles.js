import { StyleSheet } from 'react-native';

import { colors } from '../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },
  text: {
    fontSize: 17,
    paddingVertical: 10,
    paddingLeft: 10,
    color: 'black'
  }
});
