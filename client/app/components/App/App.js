import React, { Component } from 'react';
import {ActivityIndicator, AsyncStorage, ToolbarAndroid, TouchableHighlight, View, Text, TextInput, StyleSheet } from 'react-native';
import Toolbar from '../Toolbar/Toolbar';
import appStyles from './appStyles'
import settingsIcon from 'material-design-icons/action/drawable-xxxhdpi/ic_settings_white_24dp.png';
import logoIcon from 'material-design-icons/image/drawable-xxxhdpi/ic_camera_white_24dp.png';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { TOKEN } from '../../constants/session'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  async _getStorageValue(value){
    try {
      return await AsyncStorage.getItem(value);
    } catch (error) {
    }
  }

  componentDidMount(){
    this._getStorageValue(TOKEN)
      .then((token)=>{
        if(token){
          console.warn(token);
          Actions.main();
        } else {
          Actions.authorization();
        }
      })
  }
  render () {

    return (
      <View>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    )
  }
}




export default connect(({routes}) => ({routes}))(App)
