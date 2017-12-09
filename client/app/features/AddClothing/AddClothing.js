import React, { Component } from 'react'
import { Text, View, KeyboardAvoidingView, TextInput, Picker, Button } from 'react-native'
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import { TabNavigator } from '../TabNavigator';
import { styles } from './styles';
import { addClothingMutation } from '../../mutations';
import { addToAllClothingsAction } from '../../actions';

class AddClothing extends Component {
  state = {
    filter: 'Men',
    topic: 'Jackets',
    price: 0,
    name: '',
    sizes: [],
    images: []
  }

  onPress = () => {
    const { filter, topic, name, price, sizes, images } = this.state;
    if (!name || !price ) {
      this.props.addClothingMutation({ variables: { ...this.state }})
        .then(({data}) => {
          console.log(data);
          // this.props.addToAllClothingsAction(data);
        });
    }
  }
  
  onChangeNameInput(name) {
    this.setState({ name });
  }

  onChangePriceInput(price) {
    this.setState({ price });
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  onTopicChange = (topic) => {
    this.setState({ topic });
  }

  render() {
    const { filter, topic, price, name, sizes, images } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Clothing creator </Text>
        <KeyboardAvoidingView behavior="position" >
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              onChangeText={this.onChangeNameInput}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={this.onChangePriceInput}
              keyboardType="numeric"
              placeholder="Price"
            />
            <Picker
              selectedValue={filter}
              onValueChange={this.onFilterChange}
              style={styles.picker}
            >
              <Picker.Item label="Men's" value="Men" />
              <Picker.Item label="Women's" value="Women" />
              <Picker.Item label="Junior's" value="Junior" />
            </Picker>
            <Picker
              selectedValue={topic}
              onValueChange={this.onTopicChange}
              style={styles.picker}          
            >
              <Picker.Item label="Jackets" value="Jackets" />
              <Picker.Item label="Shoes" value="Shoes" />
              <Picker.Item label="Jumpers" value="Jumpers" />
              <Picker.Item label="Pants" value="Pants" />
            </Picker>
            <View style={styles.buttonGroup}>
              <Button
                style={styles.button}
                color="grey"
                title="Create"
                onPress={this.onPress}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <TabNavigator />
      </View>
    )
  }
}

AddClothing.propTypes = {
  addClothingMutation: PropTypes.func.isRequired,
  addToAllClothingsAction: PropTypes.func.isRequired
};

const AddClothingWithMutations = compose(
  graphql(addClothingMutation, { name: 'addClothingMutation' }),
)(AddClothing);

const mapDispatchToProps = dispatch => bindActionCreators({ addToAllClothingsAction }, dispatch);

export default connect(()=>{}, mapDispatchToProps)(AddClothingWithMutations);