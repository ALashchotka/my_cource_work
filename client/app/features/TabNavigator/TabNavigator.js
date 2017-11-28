import React, { Component } from 'react';
import Tabs from 'react-native-tabs';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { invoke } from 'lodash';

import { styles } from './styles';
import { setCurrentPageAction } from '../../actions';

class TabNavigator extends Component {
  constructor(props) {
    super(props);
    this.onSelectTab = this.onSelectTab.bind(this);
  }

  onSelectTab(tab) {
    const page = tab.props.name;
    this.props.setCurrentPageAction(page);
    invoke(Actions, page);
  }

  render() {
    const currentPage = this.props.tabNavigator;
    return (
      <Tabs
        selected={currentPage}
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
  setCurrentPageAction: PropTypes.func.isRequired,
  tabNavigator: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  tabNavigator: state.tabNavigator.page
});

const mapDispatchToProps = dispatch => bindActionCreators({ setCurrentPageAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator);
