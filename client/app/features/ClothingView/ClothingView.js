import React, { Component, createElement } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import PropTypes, { element } from 'prop-types';
import { find, map } from 'lodash';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';

import { styles } from './styles';
import { TabNavigator } from '../TabNavigator';
import { addToFavouritesAction, removeFromFavouritesAction } from '../../actions';

class ClothingView extends Component {
  state = {
    buttonText: 'Add to favourites'
  };

  onPressAddToFavourites = () => {
    const { 
      addToFavouritesAction, removeFromFavouritesAction, favourites, clothingItem 
    } = this.props;
    if (find(favourites, clothingItem)) {
      removeFromFavouritesAction(clothingItem);
      this.setState({
        buttonText: 'Add to favourites'
      });
    } else {
      addToFavouritesAction(this.props.clothingItem);
      this.setState({
        buttonText: 'Remove from favourites'
      });
    }
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
    const { clothingItem, favourites } = this.props;
    if (find(favourites, clothingItem)) {
      this.setState({
        buttonText: 'Remove from favourites'
      });
    } else {
      this.setState({
        buttonText: 'Add to favourites'
      });
    }
  }
  

  render() {
    const slides = this.makeSlides();
    const { clothingItem } = this.props;   
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}>{clothingItem.name}</Text>
          <Swiper
            style={styles.wrapper}
            autoplay
            autoplayTimeout={5}
            showsButtons
            dotStyle={styles.none}
            activeDotStyle={styles.none}
          >
            {slides}
          </Swiper>
        </View>
        <TouchableOpacity
          style={styles.addToFavourites}
          onPress={this.onPressAddToFavourites}
        >
          <Text>{this.state.buttonText}</Text>
        </TouchableOpacity>
        <TabNavigator />
      </View>
    )
  }
}

ClothingView.propTypes = {
  clothingItem: PropTypes.object.isRequired,
  addToFavouritesAction: PropTypes.func.isRequired,
  removeFromFavouritesAction: PropTypes.func.isRequired,
  favourites: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  clothingItem: state.catalogue.currentClothingItem,
  favourites: state.user.favourites
});

const mapDispatchToProps = dispatch => bindActionCreators({ addToFavouritesAction, removeFromFavouritesAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClothingView);
