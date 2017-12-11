import { colors } from '../../styles';

const styles = {  
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingTop: 30,
    alignItems: 'center'
  },
  info: {
    height: 400,
    width: 300
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
  activeDot: {
    height: 9,
    width: 9
  },
  dot: {
    height: 9,
    width: 9,
    borderWidth: 1, 
    borderColor: 'white'
  },
  button: {
    flex: 1,
    backgroundColor: 'grey',
    marginVertical: 20
  },
  sizes: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  size: {
    color: 'black',
    fontSize: 20,
  },
  price: {
    color: 'black',
    fontSize: 20,
    paddingTop: 30
  },
  buttonsAdd: {
    flexDirection: 'row',
  }
};

export { styles };
