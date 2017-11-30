import { StyleSheet } from 'react-native';

import { icons } from '../../styles';
import { toRGBA } from '../../utils';

const styles = StyleSheet.create({
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
    opacity: 1
  },
  iconStyle: {
    opacity: 0.2
  }
});

export {
  styles, icons
}