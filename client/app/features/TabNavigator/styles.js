import { StyleSheet } from 'react-native';

import { toRGBA } from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  tab: {
    backgroundColor: toRGBA('white', 0.8),
    borderTopWidth: 1,
    borderTopColor: toRGBA('black', 0.2)
  },
  selectedStyle: {
    color: toRGBA('black')
  }
});
