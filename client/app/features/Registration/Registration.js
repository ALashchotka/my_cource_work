import React, { Component } from 'react';
import { KeyboardAvoidingView, Button, View, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { trim } from 'lodash';

import { styles } from './styles';
import { TabNavigator } from '../../features';
import { ModalView, ShowIf } from '../../components';
import { 
  SERVER_ERROR, PASSWORD_ERROR, NAME_ERROR, EMAIL_ERROR, 
  MOBILE_ERROR, everyFalse, everyTrue
} from '../../helpers';
import { emailValidation, mobileValidation, userNameValidation, passwordValidation } from './helpers';

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
      modalText: '',
      errors: {
        isNameErrorVisible: false,
        isEmailErrorVisible: false,
        isMobileErrorVisible: false,
        isPasswordErrorVisible: false
      }
    };
  }

  onChangeNameInput(name) {
    name = trim(name);
    this.setState({
      name,
      errors: { ...this.state.errors, isNameErrorVisible: !userNameValidation(name)}
    });
  }

  onChangeEmailInput(email) {
    email = trim(email);
    this.setState({
      email,
      errors: { ...this.state.errors, isEmailErrorVisible: !emailValidation(email)}
    });
  }

  onChangeMobileInput(mobile) {
    mobile = trim(mobile);
    this.setState({
      mobile,
      errors: { ...this.state.errors, isMobileErrorVisible: !mobileValidation(mobile)}
    });
  }

  onChangePasswordInput(password) {
    password = trim(password);
    this.setState({
      password,
      errors: { ...this.state.errors, isPasswordErrorVisible: !passwordValidation(password)}
    });
  }

  onSignUpButton() {
    const {
      name, email, mobile, password, errors
    } = this.state;
    if (everyFalse(errors) && everyTrue([name, email, mobile, password])) {
      this.props.newUserMutation({ variables: { email, password, name, mobile }})
      .then(
        ({ data }) => {
          this.showModal('Registration complete');
          setTimeout(() => {
            Actions.authorization();            
          }, 3000);
          console.warn('got data', data);
        }
      )
      .catch(
        (error) => {
          console.log('there was an error sending the query', error);
          this.showModal(SERVER_ERROR);
        }
      );
    }
  }

  showModal(modalText = '') {
    this.setState({ modalText, isModalVisible: true });
    setTimeout(() => this.setState({ isModalVisible: false, modalText: '' }), 3000);
  }

  render() {
    const { 
      modalText, isModalVisible, errors: { 
        isNameErrorVisible,
        isEmailErrorVisible,
        isMobileErrorVisible,
        isPasswordErrorVisible
      }
    } = this.state;
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
              <ShowIf condition={isNameErrorVisible}>
                <Text style={styles.error}>
                  {NAME_ERROR}
                </Text>
              </ShowIf>
              <TextInput
                style={styles.input}
                onChangeText={this.onChangeEmailInput}
                placeholder="Email"
              />
              <ShowIf condition={isEmailErrorVisible}>
                <Text style={styles.error}>
                  {EMAIL_ERROR}
                </Text>
              </ShowIf>
              <TextInput
                style={styles.input}
                onChangeText={this.onChangeMobileInput}
                placeholder="Mobile number"
              />
              <ShowIf condition={isMobileErrorVisible}>
                <Text style={styles.error}>
                  {MOBILE_ERROR}
                </Text>
              </ShowIf>
              <TextInput
                style={styles.input}
                onChangeText={this.onChangePasswordInput}
                placeholder="Password"
              />
              <ShowIf condition={isPasswordErrorVisible}>
                <Text style={styles.error}>
                  {PASSWORD_ERROR}
                </Text>
              </ShowIf>
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
