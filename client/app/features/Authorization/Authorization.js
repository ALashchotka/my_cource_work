import React, { Component } from 'react';
import { KeyboardAvoidingView, Button, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { styles } from './styles';
import { TOKEN, SERVER_ERROR, LOGIN_ERROR } from '../../constants';
import { setStorageValue } from '../../utils';
import { TabNavigator } from '../../features';
import { setTokenAction } from '../../actions';
import { ModalView } from '../../components';

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmailInput = this.onChangeEmailInput.bind(this);
    this.onChangePasswordInput = this.onChangePasswordInput.bind(this);
    this.onSignUpButton = this.onSignUpButton.bind(this);
    this.onLogInButton = this.onLogInButton.bind(this);
    this.showModal = this.showModal.bind(this);
    this.state = {
      email: '',
      password: '',
      isModalVisible: false,
      modalText: ''
    };
  }

  onChangeEmailInput(email) {
    this.setState({
      email
    });
  }

  onChangePasswordInput(password) {
    this.setState({
      password
    });
  }
  onSignUpButton() {
    Actions.registration();
  }

  onLogInButton() {
    this.props.checkUserMutation({
      variables: { email: this.state.email, password: this.state.password }
    })
      .then(({ data }) => {
        console.warn(data);
        const { message, token } = data.checkUser;
        if (message === 'Log in success') {
          setStorageValue(TOKEN, token)
            .then(() => {
              Actions.profile();
              this.props.setTokenAction(token);
            });
        } else {
          this.showModal(LOGIN_ERROR);
        }
      }).catch((error) => {
        this.showModal(SERVER_ERROR);
        console.log(error);
      });
  }

  showModal(modalText) {
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
        <ModalView
          isModalVisible={isModalVisible}
          modalText={modalText}
        />
        <TabNavigator styles={styles.tabNavigator} />
      </View>
    );
  }
}

Authorization.propTypes = {
  checkUserMutation: PropTypes.func.isRequired,
  setTokenAction: PropTypes.func.isRequired
};

const checkUserMutation = gql`
    mutation checkUser($email: String, $password: String) {
     checkUser(email: $email, password: $password) {
        token
        message
      }
    }
`;

const mapStateToProps = state => ({
  token: state.user.token
});

const mapDispatchToProps = dispatch => bindActionCreators({ setTokenAction }, dispatch);

const AuthorizationWithMutations = compose(graphql(checkUserMutation, { name: 'checkUserMutation' }))(Authorization);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWithMutations);
