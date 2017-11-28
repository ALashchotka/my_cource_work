import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { styles } from './styles';
import { TabNavigator } from '../../features';

class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator />
      </View>
    );
  }
}

export default connect(({ tabNavigator }) => ({ tabNavigator }))(Main);
