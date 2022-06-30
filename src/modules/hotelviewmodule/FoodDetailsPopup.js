import React, {useRef, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import SvgStar from '../../icons/SvgStar';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Stepper from '../../uikit/Stepper/Stepper';
import Text from '../../uikit/Text/Text';
import {GARY_1} from '../../uikit/UikitUtils/colors';
const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  imageStyle: {
    height: 136,
    borderRadius: 8,
    backgroundColor: GARY_1,
  },
});
const FoodDetailsPopup = () => {
  const refRBSheet = useRef();
  const [isCount, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => refRBSheet.current.open()}>
        OPEN BOTTOM SHEET
      </Button>
      <RBSheet
        height={height - 100}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.25)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <Flex>
          <View style={styles.imageStyle} />
          {/* <Image
            resizeMode="cover"
            source={require('../../assests/image/profile.png')}
            style={styles.imageStyle}
          /> */}
          <Flex overrideStyle={{paddingHorizontal: 20}}>
            <Text size={16} bold>
              Ground Beef Tacos
            </Text>
            <Flex row center overrideStyle={{marginTop: 2, marginBottom: 8}}>
              <SvgStar />
              <Text bold overrideStyle={{marginHorizontal: 4}}>
                4.5
              </Text>
              <Text color="gray" size={12} overrideStyle={{marginTop: 3}}>
                {'(25+)'}
              </Text>
            </Flex>
            <Flex row center between>
              <Text size={16} bold>
                ₹ 100
              </Text>
              <Stepper onChange={setCount} />
            </Flex>

            <Text bold overrideStyle={{marginTop: 20, marginBottom: 30}}>
              Choice of Add On
            </Text>
            <Flex row center between>
              <Text>Pepper Julienned</Text>
              <Text>₹ 100</Text>
            </Flex>
          </Flex>
        </Flex>
      </RBSheet>
    </>
  );
};

export default FoodDetailsPopup;
