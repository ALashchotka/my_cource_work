import React, { Component } from 'react';
import { ToolbarAndroid, View, Text, TextInput, StyleSheet } from 'react-native';
import toolbarStyles from './toolbarStyles.js';
import settingsIcon from 'material-design-icons/action/drawable-xxxhdpi/ic_settings_white_24dp.png';
import logoIcon from 'material-design-icons/image/drawable-xxxhdpi/ic_camera_white_24dp.png';


export default class Toolbar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <View>
        <ToolbarAndroid
          style={toolbarStyles.toolbar}
          logo={logoIcon}
          title="My WebShop"
          actions={[{title: 'Settings', icon: settingsIcon, show: 'always'}]}
        />
      </View>
    );
  }
}