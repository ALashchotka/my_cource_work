import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import { TabNavigator } from '../../features';
import { styles } from './styles';

class Profile extends Component {
  componentDidMount() {
    if (!this.props.token) {
      Actions.authorization();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator />
      </View>
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
