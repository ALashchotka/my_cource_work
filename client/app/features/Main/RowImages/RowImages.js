import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { map, invoke } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import { styles } from './styles';
import { setCurrentPageAction } from '../../../actions';
import { getClothingsMutation } from '../../../mutations';

class RowImages extends Component {
  onPress = (button) => () => {
    // this.props.setCurrentPageAction('catalogue');
    // this.props.setCurrentFilter(button.text);
    // invoke(Actions, 'catalogue');
    const obj = {
      filter: 'Men',
      topic: 'Mama'
    }
    this.props.getClothings({variables: '' })
     .then((data) => {console.log(data)});
  }

  createRow = () => {
    const { source } = this.props;
    return map(source, (item) => (
        <TouchableOpacity onPress={this.onPress(item.text)} key={item.id}>
          <ImageBackground 
            style={styles.backdrop} 
            source={{uri: item.image}}
          >
            <View style={styles.backdropView}>
              <Text style={styles.headline}>{item.text}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )
    );
  }

  render() {
    const row = this.createRow();
    return (
      <View style={styles.container}>
        {row}
      </View>
    )
  }
}

RowImages.propTypes = {
  getClothings: PropTypes.func.isRequired
};

const RowImagesWithMutations = compose(
  graphql(getClothingsMutation, { name: 'getClothings' }),
)(RowImages);

const mapStateToProps = (state) => { return {}};

const mapDispatchToProps = dispatch => bindActionCreators({ setCurrentPageAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RowImagesWithMutations);
