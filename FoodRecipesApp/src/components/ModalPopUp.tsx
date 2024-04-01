import React from 'react';
import {Modal, Text, View, Button, StyleSheet, ScrollView} from 'react-native';
import {ModalProps} from '../utils/types';

export default function ModalPopUp({
  visible,
  text,
  onClose,
  title,
}: ModalProps) {
  const isLongText = text.length > 100;
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitle}>
            <Text style={styles.titleText}>{title}</Text>
          </View>

          {isLongText ? (
            <ScrollView style={styles.scrollView}>
              <Text>{text}</Text>
            </ScrollView>
          ) : (
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>{text}</Text>
            </View>
          )}

          <View style={styles.button}>
            <Button title="Close" color="#6a5acd" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 19, 19, 0.54)',
  },
  modalContainer: {
    backgroundColor: '#e6e6fa',
    width: '70%',
    height: '35%',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6a5acd',
  },
  scrollView: {
    maxHeight: '60%',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contentText: {
    fontSize: 18,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
