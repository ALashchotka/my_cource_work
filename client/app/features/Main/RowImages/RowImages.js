import React, { Component } from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { map, invoke } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import { styles } from './styles';
import { setCurrentPageAction } from '../../../actions';

class RowImages extends Component {
  onPress = (button) => () => {
    // this.props.setCurrentPageAction('catalogue');
    // this.props.setCurrentFilter(button.text);
    // invoke(Actions, 'catalogue');
    console.log(button);
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

const mapStateToProps = (state) => { return {}};

const mapDispatchToProps = dispatch => bindActionCreators({ setCurrentPageAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RowImages);
