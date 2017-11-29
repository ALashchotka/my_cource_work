import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export default class ShowIf extends Component {
  render() {
    const { condition, children, defaultNode, ...restProps } = this.props;
    if (condition) {
      return children.length > 1
        ? <View {...restProps}>{ children }</View>
        : React.Children.only(React.cloneElement(children, restProps));
    }
    return defaultNode;
  }
};

ShowIf.propTypes = {
  children: PropTypes.node.isRequired,
  condition: PropTypes.any,
  defaultNode: PropTypes.node
};

ShowIf.defaultProps = {
  condition: false,
  defaultNode: null
};
