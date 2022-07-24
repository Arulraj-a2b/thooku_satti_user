import React from 'react';
import Modal from 'react-native-modal';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {WHITE} from '../../uikit/UikitUtils/colors';
import Card from '../../uikit/Card/Card';
import SvgClose from '../../icons/SvgClose';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    padding: 40,
    width: 250,
    alignSelf: 'center',
    position: 'relative',
  },
  svgClose: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});

const DiningUpload = ({open, close}) => {
  const handleLaunchCamera = () => {
    close();
    launchCamera(
      {
        saveToPhotos: true,
        mediaType: 'photo',
        cameraType: 'back',
      },
      response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          // alert('ImagePicker Error: ' + response.error);
        } else {
          let source = response;
          console.log('source', source);
        }
      },
    );
  };

  const chooseImage = () => {
    close();
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        //  console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        setUri(source.assets[0]);
        const formData = new FormData();
        formData.append('file', {
          uri: source.assets[0].uri,
          type: source.assets[0].type,
          name: source.assets[0].fileName,
        });
      }
    });
  };

  return (
    <Modal animationInTiming={0} animationIn="slideInLeft" isVisible={open}>
      <Card overrideStyle={styles.overAll}>
        <TouchableOpacity style={styles.svgClose} onPress={close}>
          <SvgClose height={16} width={16} />
        </TouchableOpacity>
        <Flex center>
          <TouchableOpacity
            style={{marginBottom: 16}}
            onPress={handleLaunchCamera}>
            <Text color="link" bold>
              Choose Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={chooseImage}>
            <Text color="link" bold>
              Choose Gallery
            </Text>
          </TouchableOpacity>
        </Flex>
      </Card>
    </Modal>
  );
};

export default DiningUpload;
