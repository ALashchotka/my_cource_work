import React, { Component } from 'react';
import Tabs from 'react-native-tabs';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { invoke } from 'lodash';

import { styles, icons } from './styles';
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
        <View name="main" style={styles.iconStyle}>
          <Image source={icons.main}/>
        </View>
        <View name="catalogue" style={styles.iconStyle}>
          <Image source={icons.catalogue}/>
        </View>
        <View name="favourite" style={styles.iconStyle}>
          <Image source={icons.favourite}/>
        </View>
        <View name="profile" style={styles.iconStyle}>
          <Image source={icons.profile}/>
        </View>
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
