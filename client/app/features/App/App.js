import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';

import { getStorageValue } from '../../utils';
import { setTokenDispatcher } from '../../actions';

class App extends Component {
  componentDidMount() {
      Actions.main(); 
  }

  render() {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  routes: state.routes.routes,
  token: state.token.token,
});

const mapDispatchToProps = dispatch => bindActionCreators({ setTokenDispatcher }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(App);
