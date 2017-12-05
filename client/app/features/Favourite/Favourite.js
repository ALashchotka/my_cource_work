import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { styles } from './styles';
import { TabNavigator } from '../TabNavigator';
import { ClothingsRow } from '../../components';

class Favourite extends Component {
  createFavourites = () => {
    const { favourites } = this.props;
    if (isEmpty(favourites)) {
      return (
        <View style={styles.empty}>
          <Text style={styles.title}>Favourites</Text>
          <Text style={styles.description}>Favourites is empty</Text>
          <TouchableOpacity
            style={styles.buttonGoToCatalogue}
            onPress={this.onPress}
          >
            <Text style={styles.buttonText}>Go to Shopping!</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.favourites}>
        <ClothingsRow clothings={favourites} />
      </View>
    )
  }

  onPress = () => {
    console.log('hi');
  }

  render() {
    const basket = this.createFavourites();
    return (
      <View style={styles.container}>
        {basket}
        <TabNavigator />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  favourites: state.user.favourites
});

// const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps)(Favourite);
