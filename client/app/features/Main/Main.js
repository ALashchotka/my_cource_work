import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import { styles } from './styles';
import { TabNavigator } from '../../features';
import { SliderBlock } from '../../components';
import { SWIPER_DATA, ROW_DATA } from './clientData';
import RowImages from './RowImages';

class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <SliderBlock source={SWIPER_DATA} />
          <RowImages source={ROW_DATA} />
          <Text style={styles.text}>SHOP BY NEW RELEASES</Text>
        </ScrollView>
        <TabNavigator />
      </View>
    );
  }
}

export default connect(({ tabNavigator }) => ({ tabNavigator }))(Main);
