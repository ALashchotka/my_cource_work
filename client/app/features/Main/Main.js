import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { styles } from './styles';
import { TabNavigator } from '../../components';

class Main extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator page={'main'}/>
      </View>
    );
  }
}

export default connect(({ routes }) => ({ routes }))(Main);
