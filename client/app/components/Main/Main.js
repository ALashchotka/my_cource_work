import React, { Component } from 'react';
import { ToolbarAndroid, View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import settingsIcon from 'material-design-icons/action/drawable-xxxhdpi/ic_settings_white_24dp.png';
import logoIcon from 'material-design-icons/image/drawable-xxxhdpi/ic_camera_white_24dp.png';
import exitIcon from 'material-design-icons/navigation/drawable-xxxhdpi/ic_cancel_white_24dp.png';

import mainStyles from "./mainStyles";

import { setStorageValue } from "../../utils/storage";
import { TOKEN } from "../../constants/session";

class Main extends Component{
  constructor(props){
    super(props);
  }

  _onLogOut(){
    Actions.authorization();
    setStorageValue(TOKEN, '')
      .then(() => {
        Actions.authorization();
        this.props.client.resetStore()
      })
  }

  render(){
    return(
      <View>
        <ToolbarAndroid
          style={mainStyles.toolbar}
          logo={logoIcon}
          title="BookIt"
          actions={[{title: 'Log Out', icon: exitIcon, show: 'always'}]}
          onActionSelected={this._onLogOut}
        />
      </View>
    );
  }
}

export default connect(({routes}) => ({routes}))(Main);
