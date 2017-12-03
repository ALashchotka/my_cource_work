import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '../../constants';

const styles = {
  container: {
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 45
  },
  element: {
    height: 350,
    width: SCREEN_WIDTH / 2 - 5,
    paddingRight: 5
  },
  image: {
    height: 280
  },
  info: {
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 50
  },
  text: {
    paddingLeft: 10
  },
  price: {
    paddingLeft: 10,
    color: 'black',
    fontSize: 17
  }
};

export { styles };