import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, KeyboardAvoidingView, Button, Image, ToolbarAndroid, TouchableHighlight, View, Text, TextInput, StyleSheet} from 'react-native';
import logo from '../../assets/images/bi_logo.png';
import {mainColor} from "../../constants/colors";

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import authorizationStyles from './authorizationStyles'

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { TOKEN } from "../../constants/session";

import { setStorageValue } from "../../utils/storage";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


class Authorization extends Component{
  constructor(props){
    super(props);
    this._onChangeEmailInput = this._onChangeEmailInput.bind(this);
    this._onChangePasswordInput = this._onChangePasswordInput.bind(this);
    this._onSignUpButton = this._onSignUpButton.bind(this);
    this._onLogInButton = this._onLogInButton.bind(this);
    this.state = {
      emailUnderlineColor: 'green',
      inputEmail: '',
      inputPassword: '',
      inputsValidation: false,
    };
  }

  _onChangeEmailInput(email){
    if(emailRegex.test(email)) {
      this.setState({
        emailUnderlineColor: 'green',
        inputEmail: email,
        inputsValidation: true,
      })
    }
    else {
      this.setState({
        emailUnderlineColor: 'red'
      })
    }
  }

  _onChangePasswordInput(password){
    this.setState({
      inputPassword: password,
      inputsValidation: true
    })
  }
  _onSignUpButton(){
    this.props.newUserMutation({
      variables: { email: this.state.inputEmail, password: this.state.inputPassword }
    })
      .then(({ data }) => {
        console.warn('got data', data);
      }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }


  _onLogInButton(){
    this.props.checkUserMutation({
      variables: { email: this.state.inputEmail, password: this.state.inputPassword }
    })
      .then(({ data }) => {
      console.warn(data);
        if(data.checkUser.message === 'Log in success'){
          setStorageValue(TOKEN, data.checkUser.token)
            .then(()=>{
              Actions.app();
            });
        }
      }).catch((error) => {
    });
  }

  componentWillMount(){

  }

  render(){
    return(
      <View style={authorizationStyles.root}>
        <KeyboardAvoidingView behavior={'position'} >
          <View style={authorizationStyles.logoContainer}>
            <Image
              style={authorizationStyles.logoImage}
              resizeMode={'contain'}
              source={logo}
            />
          </View>
          <View style={authorizationStyles.formContainer}>
            <View>
              <TextInput
                style={authorizationStyles.emailInput}
                onChangeText={this._onChangeEmailInput}
                placeholder={'Email'}
                underlineColorAndroid={this.state.emailUnderlineColor}
              />
              <TextInput
                style={authorizationStyles.passwordInput}
                secureTextEntry={true}
                onChangeText={this._onChangePasswordInput}
                placeholder={'Password'}
              />
            </View>
            <View style={authorizationStyles.buttonGroup}>
              <Button
                style={authorizationStyles.logInButton}
                title="Log In"
                color={mainColor}
                onPress={this._onLogInButton}
              />
              <View>
                <View style={{alignSelf:'center',position:'absolute',borderBottomColor:'gray',borderBottomWidth:1,height:'50%',width:'100%'}}/>
                <Text style={{alignSelf:'center',padding:10, backgroundColor:'white'}}>OR</Text>
              </View>
              <Button
                style={authorizationStyles.signUpButton}
                title="Create new BookIt account"
                color={mainColor}
                onPress={this._onSignUpButton}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
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
  graphql(addUserMutation, {name: 'newUserMutation'}),
  graphql(checkUserMutation, {name: 'checkUserMutation'})
)(Authorization);


export default connect(({routes}) => ({routes}))(AuthorizationWithMutations)