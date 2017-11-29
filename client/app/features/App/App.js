import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';

import { setTokenAction } from '../../actions';
import { getStorageValue } from '../../utils';
import { TOKEN } from '../../constants';

class App extends Component {
  componentDidMount() {
    getStorageValue(TOKEN)
      .then((token) => {
        if (token) {
          this.props.setTokenAction(token);
        }
      });
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

App.propTypes = {
  setTokenAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tabNavigator: state.tabNavigator.tabNavigator,
  user: state.user.token
});

const mapDispatchToProps = dispatch => bindActionCreators({ setTokenAction }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(App);
