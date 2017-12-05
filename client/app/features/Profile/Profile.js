import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { isEmpty, forEach } from 'lodash';

import { TabNavigator } from '../../features';
import { styles } from './styles';

class Profile extends Component {
  state = {
    cost: 0
  }

  componentDidMount() {
    const { token, basket } = this.props;
    if (!this.props.token) {
      Actions.authorization();
    } else {
      let cost = 0;
      forEach(basket, (item) => cost += item.price);
      this.setState({
        cost
      })
    }
  }

  onPress = () => {
    Actions.catalogue();
    this.props.setCurrentPageAction('catalogue');
  }

  createBasket = () => {
    const { basket } = this.props;
    if (isEmpty(basket)) {
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
    return (
      <View style={styles.favourites}>
        <ClothingsRow clothings={favourites} />
      </View>
    );
  }

  createBuyButton = () => {
    const { basket } = this.props;
    if (isEmpty(basket)) {
      return (
        <TouchableOpacity
          style={styles.buyButton}
        >
          <Text style={styles.buyButtonText}>Cost: {this.state.cost}</Text>
        </TouchableOpacity>
      )
    }
    return null;
  }

  render() {
    const basket = this.createBasket();
    const buyButton = this.createBuyButton();
    return (
      <View style={styles.container}>
        {basket}
        {buyButton}
        <TabNavigator />
      </View>
    );
  }
}

Profile.propTypes = {
  token: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  token: state.user.token,
  basket: state.user.basket
});

export default connect(mapStateToProps)(Profile);
