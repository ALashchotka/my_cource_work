import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../../constants';
const styles = {
  container: {
    height: 220,
    flexDirection:'row',
  },
  backdrop: {
    justifyContent: 'center',
    height: 220,
    width: SCREEN_WIDTH / 3,
    opacity: 0.8
  },
  backdropView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 10
  },
  headline: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black'
  }
};

export { styles };