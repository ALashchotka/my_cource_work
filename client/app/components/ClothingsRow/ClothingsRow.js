import React, { Component, createElement } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import PropTypes, { element } from 'prop-types';
import { map } from 'lodash';

import { styles } from './styles';
import ClothingElement from '../ClothingElement';
export default class ClothingsRow extends Component {
  createElement = (item) => {
    return <ClothingElement item={item} key={item._id}/>
  }

  createRow = () => {
    return map(this.props.clothings, this.createElement);
  }

  render() {
    const elements = this.createRow();
    return (
      <View style={styles.container}>
        {elements}
      </View>
    )
  }
}

ClothingsRow.propTypes = {
  clothings: PropTypes.array.isRequired
}