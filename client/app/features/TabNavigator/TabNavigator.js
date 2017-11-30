import React, { Component } from 'react';
import Tabs from 'react-native-tabs';
import PropTypes from 'prop-types';
import { Text, View, Image, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { invoke } from 'lodash';

import { styles, icons } from './styles';
import { setCurrentPageAction } from '../../actions';
import { ShowIf } from '../../components';

class TabNavigator extends Component {
  state = {
    keyboardUp: false
  }

  onSelectTab = (tab) => {
    const page = tab.props.name;
    this.props.setCurrentPageAction(page);
    invoke(Actions, page);
  }

  keyboardWillShow = (e) => {
    this.setState({ keyboardUp: true });
  };

  keyboardWillHide = (e) => {
    this.setState({ keyboardUp: false });
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const currentPage = this.props.tabNavigator;
    const { keyboardUp } = this.state;
    return (
      <ShowIf condition={!keyboardUp}>
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
      </ShowIf>
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
