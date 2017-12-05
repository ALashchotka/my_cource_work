import React, { Component, createElement } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import PropTypes, { element } from 'prop-types';
import { find } from 'lodash';
import { connect } from 'react-redux';

import { styles } from './styles';

class ClothingView extends Component {
  render() {
    const item = find(clothingsData, ['_id', id]);
    return (
      <View style={styles.container}>
        {elements}
      </View>
    )
  }
}

ClothingView.propTypes = {
  id: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  clothingsData: state.catalogue.allData
});

export default connect(mapStateToProps)(ClothingView);
