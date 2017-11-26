import React, { Component } from 'react';
import { KeyboardAvoidingView, Button, Image, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';

import logo from '../../assets/images/bi_logo.png';
import { mainColor } from '../../constants/colors';
import authorizationStyles from './authorizationStyles';
import { TOKEN } from '../../constants/session';
import { setStorageValue } from '../../utils/storage';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmailInput = this.onChangeEmailInput.bind(this);
    this.onChangePasswordInput = this.onChangePasswordInput.bind(this);
    this.onSignUpButton = this.onSignUpButton.bind(this);
    this.onLogInButton = this.onLogInButton.bind(this);
    this.state = {
      emailUnderlineColor: 'green',
      inputEmail: '',
      inputPassword: '',
    };
  }

  onChangeEmailInput(email) {
    if (emailRegex.test(email)) {
      this.setState({
        emailUnderlineColor: 'green',
        inputEmail: email,
      });
    } else {
      this.setState({
        emailUnderlineColor: 'red',
      });
    }
  }

  onChangePasswordInput(password) {
    this.setState({
      inputPassword: password,
    });
  }
  onSignUpButton() {
    this.props.newUserMutation({
      variables: { email: this.state.inputEmail, password: this.state.inputPassword },
    })
      .then(({ data }) => {
        console.warn('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }


  onLogInButton() {
    this.props.checkUserMutation({
      variables: { email: this.state.inputEmail, password: this.state.inputPassword },
    })
      .then(({ data }) => {
        console.warn(data);
        if (data.checkUser.message === 'Log in success') {
          setStorageValue(TOKEN, data.checkUser.token)
            .then(() => {
              Actions.app();
            });
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={authorizationStyles.root}>
        <KeyboardAvoidingView behavior="position" >
          <View style={authorizationStyles.logoContainer}>
            <Image
              style={authorizationStyles.logoImage}
              resizeMode="contain"
              source={logo}
            />
          </View>
          <View style={authorizationStyles.formContainer}>
            <View>
              <TextInput
                style={authorizationStyles.emailInput}
                onChangeText={this.onChangeEmailInput}
                placeholder="Email"
                underlineColorAndroid={this.state.emailUnderlineColor}
              />
              <TextInput
                style={authorizationStyles.passwordInput}
                onChangeText={this.onChangePasswordInput}
                placeholder="Password"
              />
            </View>
            <View style={authorizationStyles.buttonGroup}>
              <Button
                style={authorizationStyles.logInButton}
                title="Log In"
                color={mainColor}
                onPress={this.onLogInButton}
              />
              <View>
                <View style={{
                  alignSelf: 'center',
                  position: 'absolute',
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  height: '50%',
                  width: '100%',
                }}
                />
                <Text style={{ alignSelf: 'center', padding: 10, backgroundColor: 'white' }}>OR</Text>
              </View>
              <Button
                style={authorizationStyles.signUpButton}
                title="Create new BookIt account"
                color={mainColor}
                onPress={this.onSignUpButton}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

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


export default connect(({ routes }) => ({ routes }))(AuthorizationWithMutations);
