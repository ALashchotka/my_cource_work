import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { styles } from './styles';
import { setCurrentClothingItemAction } from '../../actions';

class ClothingElement extends Component {
  onPress = (item) => () => {
    console.log(item);
    this.props.setCurrentClothingItemAction(item);
    Actions.clothingView();
  }

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity 
        onPress={this.onPress(item)} 
        style={styles.element}
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
    )
  }
}

ClothingElement.propTypes = {
  item: PropTypes.object.isRequired,
  setCurrentClothingItemAction: PropTypes.func.isRequired
}

const mapStateToProps = (state) => { return {}};

const mapDispatchToProps = dispatch => bindActionCreators({ setCurrentClothingItemAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClothingElement);
