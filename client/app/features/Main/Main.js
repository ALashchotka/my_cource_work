import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { styles } from './styles';
import { TabNavigator } from '../../features';
import { SliderBlock } from '../../components';
import { SWIPER_DATA } from './constants';

class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SliderBlock source={SWIPER_DATA}/>
        <TabNavigator />
      </View>
    );
  }
}

export default connect(({ tabNavigator }) => ({ tabNavigator }))(Main);
