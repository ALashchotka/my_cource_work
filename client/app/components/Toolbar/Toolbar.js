import React, { Component } from 'react';
import { ToolbarAndroid, View } from 'react-native';
import settingsIcon from 'material-design-icons/action/drawable-xxxhdpi/ic_settings_white_24dp.png';
import logoIcon from 'material-design-icons/image/drawable-xxxhdpi/ic_camera_white_24dp.png';

import { styles } from './styles';

export default class Toolbar extends Component {
  render() {
    return (
      <View>
        <ToolbarAndroid
          style={styles.toolbar}
          logo={logoIcon}
          title="My WebShop"
          actions={[{title: 'Settings', icon: settingsIcon, show: 'always'}]}
        />
      </View>
    );
  }
}