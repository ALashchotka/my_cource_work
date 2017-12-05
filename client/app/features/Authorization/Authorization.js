import React, { Component } from 'react';
import { KeyboardAvoidingView, Button, View, Text, TextInput, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { toLower } from 'lodash';

import { styles } from './styles';
import { USERINFO } from '../../constants';
import { SERVER_ERROR } from '../../helpers';
import { setStorageValue, loginValidation } from '../../utils';
import { TabNavigator } from '../../features';
import { setUserInfoAction } from '../../actions';
import { ModalView } from '../../components';
import { checkUserMutation } from '../../mutations';

class Authorization extends Component {
  state = {
    email: '',
    password: '',
    isModalVisible: false,
    modalText: ''
  };

  onChangeEmailInput = (email) => {
    this.setState({ email: toLower(email) });
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
      this.showModal('Log in failed');
    }
  }

  logInProcessing = () => {
    const { checkUserMutation, setUserInfoAction } = this.props;
    const { email, password } = this.state;
    checkUserMutation({ variables: { email, password }})
    .then(({ data }) => {
      console.warn(data);
      const { message, token, username, isAdmin } = data.checkUser;
      if (message === 'Log in success') { 
        setUserInfoAction({token, username, isAdmin});
        setStorageValue(USERINFO, JSON.stringify({token, username, isAdmin}));
        Actions.profile();
      } else this.showModal(message);
    })
    .catch((error) => {
      this.showModal(SERVER_ERROR);
      console.warn(error);
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

const mapStateToProps = state => ({
  token: state.user.token
});

const mapDispatchToProps = dispatch => bindActionCreators({ setUserInfoAction }, dispatch);

const AuthorizationWithMutations = compose(graphql(checkUserMutation, { name: 'checkUserMutation' }))(Authorization);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWithMutations);
