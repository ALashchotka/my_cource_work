import React, { Component, createElement } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import PropTypes, { element } from 'prop-types';
import { map } from 'lodash';

import { styles } from './styles';

export default class ClothingsRow extends Component {
  onPress = (button) => () => {
    // const filter = capitalize(split(button, '‘')[0]);
    // this.props.setCurrentPageAction('catalogue');
    // this.props.setFilterAction(filter);
    // invoke(Actions, 'catalogue');
  }

  createElement = (item) => {
    console.log(item);
    return (
      <TouchableOpacity 
        onPress={this.onPress(item.id)} 
        style={styles.element}
        key={item.id}
      >
        <Image
          style={styles.image} 
          source={{uri: item.images[0]}}
        />
        <View style={styles.info}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
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