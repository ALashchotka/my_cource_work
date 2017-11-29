import React, { Component } from 'react';
import { KeyboardAvoidingView, Button, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

import { styles } from './styles';
import { TOKEN } from '../../constants';
import { setStorageValue } from '../../utils';
import { TabNavigator } from '../../features';

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmailInput = this.onChangeEmailInput.bind(this);
    this.onChangePasswordInput = this.onChangePasswordInput.bind(this);
    this.onSignUpButton = this.onSignUpButton.bind(this);
    this.onLogInButton = this.onLogInButton.bind(this);
    this.onModal = this.onModal.bind(this);
    this.state = {
      inputEmail: '',
      inputPassword: '',
      isModalVisible: false
    };
  }

  onChangeEmailInput(email) {
    this.setState({
      inputEmail: email
    });
  }

  onChangePasswordInput(password) {
    this.setState({
      inputPassword: password
    });
  }
  onSignUpButton() {
    // this.props.newUserMutation({
    //   variables: { email: this.state.inputEmail, password: this.state.inputPassword }
    // })
    //   .then(({ data }) => {
    //     console.warn('got data', data);
    //   }).catch((error) => {
    //     console.log('there was an error sending the query', error);
    //   });
    Actions.registration();
  }

  onLogInButton() {
    this.props.checkUserMutation({
      variables: { email: this.state.inputEmail, password: this.state.inputPassword }
    })
      .then(({ data }) => {
        console.warn(data);
        if (data.checkUser.message === 'Log in success') {
          setStorageValue(TOKEN, data.checkUser.token)
            .then(() => {
              Actions.profile();
            });
        } else {
          this.onModal();
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  onModal() {
    this.setState({ isModalVisible: true });
    setTimeout(() => this.setState({ isModalVisible: false }), 2000);
  }

  render() {
    return (
      <View style={styles.conatiner}>
        <KeyboardAvoidingView behavior="position" >
          <View style={styles.formContainer}>
            <View>
              <TextInput
                style={styles.emailInput}
                onChangeText={this.onChangeEmailInput}
                placeholder="Email"
              />
              <TextInput
                style={styles.passwordInput}
                onChangeText={this.onChangePasswordInput}
                placeholder="Password"
              />
            </View>
            <View style={styles.buttonGroup}>
              <Button
                style={styles.button}
                color="grey"
                title="Log In"
                onPress={this.onLogInButton}
              />
              <View>
                <View style={{
                    alignSelf: 'center',
                    position: 'absolute',
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    height: '50%',
                    width: '100%'
                  }}
                />
                <Text style={{ alignSelf: 'center', padding: 10, backgroundColor: 'white' }}>OR</Text>
              </View>
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
            <Text style={styles.modalText}>Invalid e-mail or password</Text>
          </View>
        </Modal>
        <TabNavigator styles={styles.tabNavigator} />
      </View>
    );
  }
}

Authorization.propTypes = {
  checkUserMutation: PropTypes.func.isRequired,
  newUserMutation: PropTypes.func.isRequired
};

const checkUserMutation = gql`
    mutation checkUser($email: String, $password: String) {
     checkUser(email: $email, password: $password) {
        token
        message
      }
    }
`;

const addUserMutation = gql`
    mutation addUser($email: String, $password: String) {
      addUser(email: $email, password: $password) {
        email
        password
      }
    }
`;

const AuthorizationWithMutations = compose(
  graphql(addUserMutation, { name: 'newUserMutation' }),
  graphql(checkUserMutation, { name: 'checkUserMutation' }),
)(Authorization);


export default connect(({ tabNavigator }) => ({ tabNavigator }))(AuthorizationWithMutations);
