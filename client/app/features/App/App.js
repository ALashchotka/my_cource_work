import React, { Component } from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';

import { setUserInfoAction } from '../../actions';
import { getStorageValue } from '../../utils';
import { USERINFO } from '../../constants';
import { TabNavigator } from '../TabNavigator/index';

class App extends Component {
  componentDidMount() {
    getStorageValue(USERINFO)
      .then((user) => {
        if (user) {
          this.props.setUserInfoAction(JSON.parse(user));
        }
      });
    Actions.main();
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor="transparent" translucent/>
        <ActivityIndicator size="large" />
        <TabNavigator />
      </View>
    );
  }
}

App.propTypes = {
  setUserInfoAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tabNavigator: state.tabNavigator.tabNavigator,
  user: state.user.token
});

const mapDispatchToProps = dispatch => bindActionCreators({ setUserInfoAction }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(App);
