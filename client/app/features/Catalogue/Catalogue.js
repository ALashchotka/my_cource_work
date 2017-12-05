import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { styles } from './styles';
import { TabNavigator } from '../TabNavigator';
import { ClothingsRow } from '../../components';

class Catalogue extends Component {
  createCatalogue = () => {
    const { catalogue } = this.props;
    return (
      <View style={styles.catalogue}>
        <ClothingsRow clothings={catalogue} />
      </View>
    )
  }

  render() {
    const catalogue = this.createCatalogue();
    return (
      <View style={styles.container}>
        {catalogue}
        <TabNavigator />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  catalogue: state.catalogue.allData
});

// const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps)(Catalogue);
