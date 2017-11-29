import React, { Component } from 'react';
import { KeyboardAvoidingView, Button, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import { styles } from './styles';
import { TabNavigator } from '../../features';
import { ModalView } from '../../components';
import { SERVER_ERROR } from '../../constants';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.onChangeNameInput = this.onChangeNameInput.bind(this);
    this.onChangeEmailInput = this.onChangeEmailInput.bind(this);
    this.onChangeMobileInput = this.onChangeMobileInput.bind(this);
    this.onChangePasswordInput = this.onChangePasswordInput.bind(this);
    this.onSignUpButton = this.onSignUpButton.bind(this);
    this.showModal = this.showModal.bind(this);
    this.state = {
      email: '',
      password: '',
      mobile: '',
      name: '',
      isModalVisible: false,
      modalText: ''
    };
  }

  onChangeNameInput(name) {
    this.setState({
      name
    });
  }

  onChangeEmailInput(email) {
    this.setState({
      email
    });
  }

  onChangeMobileInput(mobile) {
    this.setState({
      mobile
    });
  }

  onChangePasswordInput(password) {
    this.setState({
      password
    });
  }

  onSignUpButton() {
    const {
      name, email, mobile, password
    } = this.state;
    this.props.newUserMutation({
      variables: {
        email, password, name, mobile
      }
    })
      .then(({ data }) => {
        Actions.authorization();
        console.warn('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
        this.setState({
          modalText: SERVER_ERROR
        });
        this.showModal();
      });
  }

  showModal() {
    this.setState({ isModalVisible: true });
    setTimeout(() => this.setState({ isModalVisible: false, modalText: '' }), 2000);
  }

  render() {
    const { modalText, isModalVisible } = this.state;
    return (
      <View style={styles.conatiner}>
        <KeyboardAvoidingView behavior="position" >
          <View style={styles.formContainer}>
            <View>
              <TextInput
                style={styles.input}
                onChangeText={this.onChangeNameInput}
                placeholder="Name"
              />
              <TextInput
                style={styles.input}
                onChangeText={this.onChangeEmailInput}
                placeholder="Email"
              />
              <TextInput
                style={styles.input}
                onChangeText={this.onChangeMobileInput}
                placeholder="Mobile number"
              />
              <TextInput
                style={styles.input}
                onChangeText={this.onChangePasswordInput}
                placeholder="Password"
              />
            </View>
            <View style={styles.buttonGroup}>
              <Button
                style={styles.button}
                color="grey"
                title="Sign Up"
                onPress={this.onSignUpButton}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <ModalView
          isModalVisible={isModalVisible}
          modalText={modalText}
        />
        <TabNavigator styles={styles.tabNavigator} />
      </View>
    );
  }
}

Registration.propTypes = {
  newUserMutation: PropTypes.func.isRequired
};

const addUserMutation = gql`
    mutation addUser($email: String, $password: String, $name: String, $mobile: String) {
      addUser(email: $email, password: $password, name: $name, mobile: $mobile) {
        email
        password,
        name,
        mobile
      }
    }
`;

const RegistrationWithMutations = compose(
  graphql(addUserMutation, { name: 'newUserMutation' }),
)(Registration);


export default connect(({ tabNavigator }) => ({ tabNavigator }))(RegistrationWithMutations);
