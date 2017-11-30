import React, { Component } from 'react';
import { KeyboardAvoidingView, Button, View, Text, TextInput, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { styles } from './styles';
import { USERINFO } from '../../constants';
import { SERVER_ERROR, loginValidation } from '../../helpers';
import { setStorageValue } from '../../utils';
import { TabNavigator } from '../../features';
import { setUserInfoAction } from '../../actions';
import { ModalView } from '../../components';

class Authorization extends Component {
  state = {
    email: '',
    password: '',
    isModalVisible: false,
    modalText: ''
  };

  onChangeEmailInput = (email) => {
    this.setState({ email });
  }

  onChangePasswordInput = (password) => {
    this.setState({ password });
  }

  onSignUpButton = () => {
    Actions.registration();
  }

  onLogInButton = () => {
    const { email, password } = this.state;
    Keyboard.dismiss();
    if (loginValidation(email, password)) {
      this.logInProcessing();
    } else {
      this.showModal(LOGIN_ERROR);
    }
  }

  logInProcessing = () => {
    const { checkUserMutation, setUserInfoAction } = this.props;
    const { email, password } = this.state;
    checkUserMutation({ variables: { email, password }})
    .then(({ data }) => {
      console.warn(data);
      const { message, token, username } = data.checkUser;
      message === 'Log in success' 
        ? setStorageValue(USERINFO, JSON.stringify({token, username}))
          .then(() => {
            setUserInfoAction({token, username});
            Actions.profile();
          })
        : this.showModal(message);
    })
    .catch((error) => {
      this.showModal(SERVER_ERROR);
      console.log(error);
    });

  }

  showModal = (modalText = '') => {
    this.setState({ isModalVisible: true, modalText });
    setTimeout(() => this.setState({ isModalVisible: false }), 2000);
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
                onChangeText={this.onChangeEmailInput}
                keyboardType="email-address"
                placeholder="Email"
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
                <Text style={{ alignSelf: 'center', padding: 10, backgroundColor: '#f3f3f3' }}>OR</Text>
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
        <ModalView
          isModalVisible={isModalVisible}
          modalText={modalText}
        />
        <TabNavigator />
      </View>
    );
  }
}

Authorization.propTypes = {
  checkUserMutation: PropTypes.func.isRequired,
  setUserInfoAction: PropTypes.func.isRequired
};

const checkUserMutation = gql`
    mutation checkUser($email: String, $password: String) {
     checkUser(email: $email, password: $password) {
        token
        message
        username
      }
    }
`;

const mapStateToProps = state => ({
  token: state.user.token
});

const mapDispatchToProps = dispatch => bindActionCreators({ setUserInfoAction }, dispatch);

const AuthorizationWithMutations = compose(graphql(checkUserMutation, { name: 'checkUserMutation' }))(Authorization);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWithMutations);
