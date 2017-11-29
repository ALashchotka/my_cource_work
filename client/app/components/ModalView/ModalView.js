import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import { styles } from './styles';

export default class ModalView extends Component {
  render() {
    const { isModalVisible, modalText } = this.props;
    return (
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={800}
        animationOutTiming={800}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={800}
        backdropOpacity={0}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalText}</Text>
        </View>
      </Modal>
    );
  }
}

ModalView.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  modalText: PropTypes.string.isRequired
};

