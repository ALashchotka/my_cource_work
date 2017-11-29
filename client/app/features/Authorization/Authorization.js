import React, { Component } from 'react';
import { KeyboardAvoidingView, Button, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { bindActionCreators } from 'redux';

import { styles } from './styles';
import { TOKEN } from '../../constants';
import { setStorageValue } from '../../utils';
import { TabNavigator } from '../../features';
import { setTokenAction } from '../../actions';

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmailInput = this.onChangeEmailInput.bind(this);
    this.onChangePasswordInput = this.onChangePasswordInput.bind(this);
    this.onSignUpButton = this.onSignUpButton.bind(this);
    this.onLogInButton = this.onLogInButton.bind(this);
    this.showModal = this.showModal.bind(this);
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
    Actions.registration();
  }

  onLogInButton() {
    this.props.checkUserMutation({
      variables: { email: this.state.inputEmail, password: this.state.inputPassword }
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
          this.showModal();
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  showModal() {
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
