import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import { styles } from './styles';
import { TabNavigator } from '../TabNavigator';
import { ClothingsRow } from '../../components';
import { setFilterAction, setTopicAction } from '../../actions';

class Catalogue extends Component {
  state = {
    filter: 'All',
    topic: 'All'
  }

  createCatalogue = () => {
    const { catalogue } = this.props;
    // return (
    //   <View style={styles.catalogue}>
    //     <ClothingsRow clothings={catalogue} />
    //   </View>
    // )
  }

  onFilterChange = (value) => {
    this.setState({
      filter: value
    });
    this.props.setFilterAction(value);
  }

  onTopicChange = (value) => {
    this.setState({
      topic: value
    });
    this.props.setTopicAction(value);
  }

  createPickers = () => {
    const { filter, topic } = this.state;
    return (
      <View style={styles.pickers}>
        <Picker
          selectedValue={filter}
          onValueChange={this.onFilterChange}
          style={styles.picker}
        >
          <Picker.Item label="Sex" value="All" />
          <Picker.Item label="Men's" value="Men" />
          <Picker.Item label="Woman's" value="Woman" />
          <Picker.Item label="Junior's" value="Junior" />
        </Picker>
        <Picker
          selectedValue={topic}
          onValueChange={this.onTopicChange}
          style={styles.picker}          
        >
          <Picker.Item label="Type" value="All" />
          <Picker.Item label="Jackets" value="Jacket" />
          <Picker.Item label="Shoes" value="Shoes" />
          <Picker.Item label="Jumpers" value="Jumper" />
          <Picker.Item label="Pants" value="Pants" />
        </Picker>
      </View>
    )
  }

  componentDidMount() {
    const { filter, topic } = this.props.catalogue;
    this.setState({
      filter,
      topic
    })
  }
  

  render() {
    const catalogue = this.createCatalogue();
    const pickers = this.createPickers();
    return (
      <View style={styles.container}>
        {pickers}
        {catalogue}
        <TabNavigator />
      </View>
    );
  }
}

Catalogue.propTypes = {
  catalogue: PropTypes.object.isRequired,
  setFilterAction: PropTypes.func.isRequired,
  setTopicAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  catalogue: state.catalogue
});

const mapDispatchToProps = dispatch => bindActionCreators({ setFilterAction, setTopicAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);