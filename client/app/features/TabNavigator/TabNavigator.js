import React, { Component } from 'react';
import Tabs from 'react-native-tabs';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { invoke } from 'lodash';

import { styles } from './styles';
import { setCurrentPage } from '../../actions';

class TabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page
    };
    this.onSelectTab = this.onSelectTab.bind(this);
    this.MoveToPage = this.MoveToPage.bind(this);
  }

  onSelectTab(tab) {
    const page = tab.props.name;
    this.setState({ page: tab.props.name });
    this.MoveToPage(page);
  }

  MoveToPage(page) {
    this.props.setCurrentPage(page);
    invoke(Actions, page);
  }

  render() {
    return (
      <Tabs
        selected={this.state.page}
        style={styles.tab}
        selectedStyle={styles.selectedStyle}
        onSelect={this.onSelectTab}
      >
        <Text name="main">Main</Text>
        <Text name="directory">Directory</Text>
        <Text name="favourite">Favourite</Text>
        <Text name="profile">Profile</Text>
      </Tabs>
    );
  }
}

TabNavigator.propTypes = {
  page: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  routes: state.routes.routes
});

const mapDispatchToProps = dispatch => bindActionCreators({ setCurrentPage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator);
