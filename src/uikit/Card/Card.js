import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import { BLACK, WHITE } from '../UikitUtils/colors';

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 10,
    elevation: 2,
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 10,
    backgroundColor: WHITE,
  },
});


const Card = ({children, overrideStyle}) => {
  const [styleContainer, setStyleContainer] = useState([]);

  useEffect(() => {
    handleStyleContainer();
  }, []);

  const handleStyleContainer = () => {
    const styleContainerArray = [styles.cardStyle];
    setStyleContainer(styleContainerArray);
  };
  return <View style={[...styleContainer, overrideStyle]}>{children}</View>;
};

export default Card;
