import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { isEmpty, forEach } from 'lodash';
import { bindActionCreators } from 'redux';
import { graphql, compose } from 'react-apollo';

import { TabNavigator } from '../../features';
import { styles } from './styles';
import { ClothingsRow } from '../../components';
import { setCurrentPageAction, setUserInfoAction } from '../../actions';
import { checkClothingMutation } from '../../mutations';

class Profile extends Component {
  state = {
    items: [],
    cost: 0
  }

  componentDidMount() {
    const { token, basket, checkClothingMutation } = this.props;
    if (!token) {
      Actions.authorization();
    } else {
      this.setState({
        items: [],
        cost: 0
      })
      forEach(basket, 
        (id) => checkClothingMutation({ variables: {id}})
          .then(({data}) => {
            const a = this.state.items;
            const b = this.state.cost + data.checkClothing.price;
            a.push(data.checkClothing);
            this.setState({
              items: a,
              cost: b
            });
          }
        )
      );
    }
  }

  onPress = () => {
    Actions.catalogue();
    this.props.setCurrentPageAction('catalogue');
  }

  createBasket = () => {
    const { items } = this.state;
    if (isEmpty(items)) {
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
          <TouchableOpacity
            style={[styles.buttonGoToCatalogue, {marginTop: 50}]}
            onPress={() => { this.props.setUserInfoAction(); Actions.authorization() }}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.favourites}>
        <ClothingsRow clothings={items} />
        <Button
          style={styles.button}
          color="grey"
          title={`Cost: ${this.state.cost}`}
          onPress={this.onPress}
        />
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
  token: PropTypes.string.isRequired,
  basket: PropTypes.array.isRequired,
  setCurrentPageAction: PropTypes.func.isRequired,
  checkClothingMutation: PropTypes.func.isRequired,
  setUserInfoAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  token: state.user.token,
  basket: state.user.basket
});

const mapDispatchToProps = dispatch => bindActionCreators({ setCurrentPageAction, setUserInfoAction }, dispatch);

const ProfileWithMutations = compose(graphql(checkClothingMutation, { name: 'checkClothingMutation' }))(Profile);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWithMutations);
