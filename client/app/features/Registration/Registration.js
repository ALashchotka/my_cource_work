import React, { Component } from 'react';
import { KeyboardAvoidingView, Button, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import { styles } from './styles';
import { TabNavigator } from '../../features';

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
          modalText: 'Unable connect to server'
        });
        this.showModal();
      });
  }

  showModal() {
    this.setState({ isModalVisible: true });
    setTimeout(() => this.setState({ isModalVisible: false, modalText: '' }), 2000);
  }

  render() {
    const { modalText } = this.state;
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
        <Modal
          isVisible={this.state.isModalVisible}
          style={styles.modal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          animationInTiming={800}
          animationOutTiming={800}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
          backdropOpacity={0}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalText}</Text>
          </View>
        </Modal>
        <TabNavigator styles={styles.tabNavigator} />
      </View>
    );
  }
}

Registration.propTypes = {
  // checkUserMutation: PropTypes.func.isRequired,
  newUserMutation: PropTypes.func.isRequired
};

const checkUserMutation = gql`
    mutation checkUser($email: String, $password: String, $name: String, $mobile: String) {
     checkUser(email: $email, password: $password, name: $name, mobile: $mobile) {
        token
        message
      }
    }
`;

const addUserMutation = gql`
    mutation addUser($email: String, $password: String, $name: String, $mobile: String) {
      addUser(email: $email, password: $password) {
        email
        password,
        name,
        mobile
      }
    }
`;

const RegistrationWithMutations = compose(
  graphql(addUserMutation, { name: 'newUserMutation' }),
  graphql(checkUserMutation, { name: 'checkUserMutation' }),
)(Registration);


export default connect(({ tabNavigator }) => ({ tabNavigator }))(RegistrationWithMutations);
