import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  selectedIconStyle: {
    borderTopWidth: 2,
    borderTopColor:'red'
  },
  tab: {
    backgroundColor:'white', 
    opacity: 0.8
  },
  selectedStyle: {
    color:'black'
  }
});
