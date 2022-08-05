import React from 'react';
import {WebView} from 'react-native-webview';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

const PrivacyScreen = () => {
  return (
    <WebView
      source={{uri: 'https://www.dindigulthookusatti.com/privacy.html'}}
      style={{height, width}}
    />
  );
};

export default PrivacyScreen;
