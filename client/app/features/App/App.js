import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';

import { setTokenAction } from '../../actions';

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
  tabNavigator: state.tabNavigator.tabNavigator,
  token: state.token.token
});

const mapDispatchToProps = dispatch => bindActionCreators({ setTokenAction }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(App);
