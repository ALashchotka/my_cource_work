import React, { Component, createElement } from 'react'
import { Text, View, Image, Button} from 'react-native'
import PropTypes, { element } from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { find, map, forEach, isString } from 'lodash';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';

import { styles } from './styles';
import { TabNavigator } from '../TabNavigator';
import { addToFavouritesAction, removeFromFavouritesAction, addToBasketAction, removeFromBasketAction, removeFromBasket } from '../../actions';
import { ShowIf } from '../../components';
import { removeClothingMutation } from '../../mutations';

class ClothingView extends Component {
  state = {
    favouritesText: '',
    basketText: ''
  };

  onPressFavourites = () => {
    const { 
      addToFavouritesAction, removeFromFavouritesAction, favourites, clothingItem: { _id } 
    } = this.props;
    let flag = false;
    forEach(favourites, (item) => {
      if (item === _id) flag = true;
    })
    if (flag) {
      removeFromFavouritesAction(_id);
      this.setState({
        favouritesText: 'Add to favourites'
      });
    } else {
      addToFavouritesAction(_id);
      this.setState({
        favouritesText: 'Remove from favourites'
      });
    }
  }

  onPressBasket = () => {
    const { 
      addToBasketAction, removeFromBasketAction, favourites, clothingItem: { _id }
    } = this.props;
    let flag = false;
    forEach(favourites, (item) => {
      if (item === _id) flag = true;
    })
    if (flag) {
      removeFromBasketAction(_id);
      this.setState({
        basketText: 'Add to basket'
      });
    } else {
      addToBasketAction(_id);
      this.setState({
        basketText: 'Remove from basket'
      });
    }
  }

  onPressDelete = () => {
    const id = this.props.clothingItem._id;
    this.props.removeClothingMutation({ variables: { id }})
      .then(({data}) => console.log(data));
  }

  makeSlides = () => {
    const { images } = this.props.clothingItem;
    return map(images, (image, index) => (
      <Image
        style={styles.image}
        source={{uri: image}}
        key={index}
      />
    ));
  }

  componentDidMount = () => {
    const { clothingItem: { _id }, favourites, basket } = this.props;
    let flag = false;
    forEach(favourites, (item) => {
      if (item === _id) flag = true;
    })
    if (flag) {
      this.setState({
        favouritesText: 'Remove from favourites'
      });
    } else {
      this.setState({
        favouritesText: 'Add to favourites'
      });
    }
    forEach(basket, (item) => {
      if (item === _id) flag = true;
    })
    if (flag) {
      this.setState({
        basketText: 'Remove from basket'
      });
    } else {
      this.setState({
        basketText: 'Add to basket'
      });
    }
  }
  
  createSize = () => {
    const { sizes } = this.props.clothingItem;
    return map(sizes, (size) => (
      <Text style={styles.size}>{`${size} `}</Text>
    ));
  }

  render() {
    const slides = this.makeSlides();
    const sizes = this.createSize();
    const { clothingItem: { name, price }, isAdmin, token } = this.props;
    const { favouritesText, basketText } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}>{ name }</Text>
          <ShowIf condition={isAdmin}>
            <Button
              style={styles.button}
              color="grey"
              title="Delete clothing"
              onPress={this.onPressDelete}
            />
          </ShowIf>
          <Swiper
            style={styles.wrapper}
            activeDotColor='white'
            activeDotStyle={styles.activeDot}
            dotStyle={styles.dot}
            autoplay
            autoplayTimeout={5}
          >
            { slides }
          </Swiper>
        </View>
        <Text style={styles.price}>{ `$${price}` }</Text>
        <View style={styles.sizes}>
          <Text style={styles.size}>Sizes: </Text>
          {sizes}
        </View>
        <ShowIf condition={token} style={styles.buttonsAdd}>
          <Button
            style={styles.button}
            color="grey"
            title={favouritesText}
            onPress={this.onPressFavourites}
          />
          <Button
            style={styles.button}
            color="grey"
            title={basketText}
            onPress={this.onPressBasket}
          />
        </ShowIf>
        <TabNavigator />
      </View>
    )
  }
}

ClothingView.propTypes = {
  clothingItem: PropTypes.object.isRequired,
  addToFavouritesAction: PropTypes.func.isRequired,
  removeFromFavouritesAction: PropTypes.func.isRequired,
  addToBasketAction: PropTypes.func.isRequired,
  removeFromBasketAction: PropTypes.func.isRequired,
  removeClothingMutation: PropTypes.func.isRequired,
  favourites: PropTypes.array.isRequired,
  basket: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  clothingItem: state.catalogue.currentClothingItem,
  favourites: state.user.favourites,
  basket: state.user.basket,
  isAdmin: state.user.isAdmin,
  token: state.user.token
});

const mapDispatchToProps = dispatch => bindActionCreators({ addToFavouritesAction, removeFromFavouritesAction, addToBasketAction, removeFromBasketAction }, dispatch);

const ClothingViewWithMutations = compose(graphql(removeClothingMutation, { name: 'removeClothingMutation' }))(ClothingView);

export default connect(mapStateToProps, mapDispatchToProps)(ClothingViewWithMutations);
