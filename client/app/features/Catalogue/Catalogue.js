import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Picker } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty, filter } from 'lodash';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import { styles } from './styles';
import { TabNavigator } from '../TabNavigator';
import { ClothingsRow, ShowIf } from '../../components';
import { setFilterAction, setTopicAction } from '../../actions';

class Catalogue extends Component {
  state = {
    filter: 'All',
    topic: 'All'
  }

  createCatalogue = () => {
    const { allData } = this.props.catalogue;
    let clothings = filter(allData, (item) => this.state.filter === 'All' ? item : item.filter === this.state.filter);
    clothings = filter(clothings, (item) => this.state.topic === 'All' ? item : item.topic === this.state.topic);
    return (
      <View style={styles.catalogue}>
        <ClothingsRow clothings={clothings} />
      </View>
    )
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
          <Picker.Item label="Women's" value="Women" />
          <Picker.Item label="Junior's" value="Junior" />
        </Picker>
        <Picker
          selectedValue={topic}
          onValueChange={this.onTopicChange}
          style={styles.picker}          
        >
          <Picker.Item label="Type" value="All" />
          <Picker.Item label="Jackets" value="Jackets" />
          <Picker.Item label="Shoes" value="Shoes" />
          <Picker.Item label="Jumpers" value="Jumpers" />
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
    const { isAdmin } = this.props;
    const catalogue = this.createCatalogue();
    const pickers = this.createPickers();
    return (
      <View style={styles.container}>
        {pickers}
        <ShowIf condition={isAdmin}>
          <Button
            style={styles.button}
            onPress={() => Actions.addClothing()}
            title="Add clothing"
            color="grey"
          />
        </ShowIf>
        {catalogue}
        <TabNavigator />
      </View>
    );
  }
}

Catalogue.propTypes = {
  catalogue: PropTypes.object.isRequired,
  setFilterAction: PropTypes.func.isRequired,
  setTopicAction: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  catalogue: state.catalogue,
  isAdmin: state.user.isAdmin
});

const mapDispatchToProps = dispatch => bindActionCreators({ setFilterAction, setTopicAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
