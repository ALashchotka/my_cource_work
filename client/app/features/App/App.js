import React, { Component } from 'react';
import { ActivityIndicator, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { graphql, compose } from 'react-apollo';

import { setUserInfoAction, setAllClothingsAction } from '../../actions';
import { getStorageValue } from '../../utils';
import { USERINFO } from '../../constants';
import { getClothingsMutation } from '../../mutations';

class App extends Component {
  componentDidMount() {
    const { setUserInfoAction, setAllClothingsAction, getClothings } = this.props;
    getStorageValue(USERINFO)
      .then((user) => {
        if (user) {
          setUserInfoAction(JSON.parse(user));
        }
      });
    getClothings({variables: '' })
     .then((data) => setAllClothingsAction(data.data.getClothings));
    Actions.main();
  }

  render() {
    return (
      <View>
        <StatusBar backgroundColor="transparent" translucent/>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

App.propTypes = {
  setUserInfoAction: PropTypes.func.isRequired,
  getClothings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ setUserInfoAction, setAllClothingsAction }, dispatch);

const AppWithMutations = compose(graphql(getClothingsMutation, { name: 'getClothings' }))(App);

export default connect(mapStateToProps, mapDispatchToProps)(AppWithMutations);
