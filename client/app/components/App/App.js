import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { TOKEN } from '../../constants/session';

class App extends Component {
  componentDidMount() {
    this.getStorageValue(TOKEN)
    .then((token) => {
      if (token) {
        console.warn(token);
        Actions.main();
      } else {
        Actions.authorization();
      }
    }),
  }

  async getStorageValue(value) {
    try {
      return await AsyncStorage.getItem(value);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default connect(({ routes }) => ({ routes }))(App);
