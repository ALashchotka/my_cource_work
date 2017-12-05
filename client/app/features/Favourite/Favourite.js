import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import { Actions } from 'react-native-router-flux';

import { styles } from './styles';
import { TabNavigator } from '../TabNavigator';
import { ClothingsRow } from '../../components';
import { setCurrentPageAction } from '../../actions';

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
    Actions.catalogue();
    this.props.setCurrentPageAction('catalogue');
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

const mapDispatchToProps = dispatch => bindActionCreators({ setCurrentPageAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
