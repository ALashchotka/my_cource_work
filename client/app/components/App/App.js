import React, { Component } from 'react';
import {ActivityIndicator, AsyncStorage, ToolbarAndroid, TouchableHighlight, View, Text, TextInput, StyleSheet } from 'react-native';
import settingsIcon from 'material-design-icons/action/drawable-xxxhdpi/ic_settings_white_24dp.png';
import logoIcon from 'material-design-icons/image/drawable-xxxhdpi/ic_camera_white_24dp.png';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { TOKEN } from '../../constants/session'

class App extends Component {
  constructor() {
    super(props);
  }

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

  async getStorageValue(value){
    try {
      return await AsyncStorage.getItem(value);
    } catch (error) {
    }
  }
  
  render() {
    return (
      <View>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    )
  }
}

export default connect(({routes}) => ({routes}))(App)
