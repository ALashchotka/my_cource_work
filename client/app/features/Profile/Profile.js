import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import { TabNavigator } from '../../features';
import { styles } from './styles';

class Profile extends Component {
  componentDidMount() {
    if (!this.props.token) {
      Actions.authorization();
    }
  }

  onPress = () => {
    Actions.catalogue();
    this.props.setCurrentPageAction('catalogue');
  }

  createBasket = () => {
    return (
      <View style={styles.empty}>
        <Text style={styles.title}>Basket</Text>
        <Text style={styles.description}>Basket is empty</Text>
        <TouchableOpacity
          style={styles.buttonGoToCatalogue}
          onPress={this.onPress}
        >
          <Text style={styles.buttonText}>Go to Shopping!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const basket = this.createBasket();
    return (
      <View style={styles.container}>
        {basket}
        <TabNavigator />
      </View>
    );
  }
}

Profile.propTypes = {
  token: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  token: state.user.token
});

export default connect(mapStateToProps)(Profile);
