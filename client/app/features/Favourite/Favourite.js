import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, forEach } from 'lodash';
import { Actions } from 'react-native-router-flux';
import { graphql, compose } from 'react-apollo';

import { styles } from './styles';
import { TabNavigator } from '../TabNavigator';
import { ClothingsRow } from '../../components';
import { setCurrentPageAction } from '../../actions';
import { checkClothingMutation } from '../../mutations';

class Favourite extends Component {
  createFavourites = () => {
    const { items } = this.state;
    if (isEmpty(items)) {
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
        <ClothingsRow clothings={items} />
      </View>
    )
  }

  state = {
    items: []
  }

  componentWillMount = () => {
    const { checkClothingMutation, favourites } = this.props;
    forEach(favourites, 
      (id) => checkClothingMutation({ variables: {id}})
        .then(({data}) => {
          const a = this.state.items;
          a.push(data.checkClothing);
          this.setState({
            items: a
          });
        }
      )
    );
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

const FavouriteWithMutations = compose(graphql(checkClothingMutation, { name: 'checkClothingMutation' }))(Favourite);

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteWithMutations);
