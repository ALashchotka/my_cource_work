import React, { Component } from 'react';
import { ToolbarAndroid, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import logoIcon from 'material-design-icons/image/drawable-xxxhdpi/ic_camera_white_24dp.png';
import exitIcon from 'material-design-icons/navigation/drawable-xxxhdpi/ic_cancel_white_24dp.png';

import { styles } from './styles';
import { setStorageValue } from '../../utils/storage';
import { TOKEN } from '../../constants/session';

class Main extends Component {
  onLogOut() {
    Actions.authorization();
    setStorageValue(TOKEN, '')
      .then(() => {
        Actions.authorization();
        this.props.client.resetStore();
      });
  }

  render() {
    return (
      <View>
        <ToolbarAndroid
          style={styles.toolbar}
          logo={logoIcon}
          title="BookIt"
          actions={[{ title: 'Log Out', icon: exitIcon, show: 'always' }]}
          onActionSelected={this.onLogOut}
        />
      </View>
    );
  }
}

export default connect(({ routes }) => ({ routes }))(Main);
