import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { sampleSize } from 'lodash';

import { styles } from './styles';
import { TabNavigator } from '../../features';
import { SliderBlock, ClothingsRow } from '../../components';
import { SWIPER_DATA, ROW_DATA } from './clientData';
import RowImages from './RowImages';

class Main extends Component {
  render() {
    const dataForClothingsRow = sampleSize(this.props.clothingsData, 10);
    return (
      <View style={styles.container}>
        <ScrollView>
          <SliderBlock source={SWIPER_DATA} />
          <RowImages source={ROW_DATA} />
          <Text style={styles.text}>SHOP BY NEW RELEASES</Text>
          <ClothingsRow clothings={dataForClothingsRow}/>
        </ScrollView>
        <TabNavigator />
      </View>
    );
  }
}


const mapStateToProps = state => ({
  clothingsData: state.catalogue.allData
});

// const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps)(Main);
