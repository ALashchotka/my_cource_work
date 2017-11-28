import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import { TabNavigator } from '../../features';

class Profile extends Component {
  componentDidMount() {
    if (!this.props.token) {
      Actions.authorization();
    }
  }

  render() {
    return (
      <TabNavigator />
    );
  }
}

Profile.propTypes = {
  token: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  token: state.user.token
});

export default connect(mapStateToProps)(Profile);
