import { colors } from '../../styles';

const styles = {  
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingTop: 30,
    alignItems: 'center'
  },
  info: {
    paddingHorizontal: 25,
    height: 500,
    width: 400
  },
  image: {
    height: 400
  },
  title: {
    paddingBottom: 10,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black'
  },
  none: {
    height: 0,
    width: 0
  }
};

export {
  styles
};
