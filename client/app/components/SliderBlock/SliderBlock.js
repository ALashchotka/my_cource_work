import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { map, invoke } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import { styles } from './styles';
import { setCurrentPageAction } from '../../actions';

class SliderBlock extends Component {
  onPressButton = (page) => () => {
    this.props.setCurrentPageAction(page);
    invoke(Actions, page);
  }

  createButton = (button) => {
    return (
      <TouchableOpacity style={styles.button} onPress={this.onPressButton(button.url)}>
        <Text style={styles.buttonText}>{button.text}</Text>
      </TouchableOpacity>
    );
  }

  createSlides = () => {
    const { source } = this.props;
    return map(source, (item) => {
      const button = item.button ? this.createButton(item.button) : null;
      return (
        <ImageBackground 
          style={styles.backdrop} 
          source={{uri: item.image}}
          key={item.id}
        >
          <View style={styles.backdropView}>
            <Text style={styles.headline}>{item.text}</Text>
          </View>
          {button}
        </ImageBackground>
      )
    });
  }

  render() {
    const slides = this.createSlides();
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          activeDotColor='white'
          activeDotStyle={styles.activeDot}
          dotStyle={styles.dot}
          autoplay
          autoplayTimeout={5}
        >
          {slides}
        </Swiper>
      </View>
    )
  }
}

SliderBlock.propTypes = {
  source: PropTypes.array.isRequired,
  setCurrentPageAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => { return {}};

const mapDispatchToProps = dispatch => bindActionCreators({ setCurrentPageAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SliderBlock);
