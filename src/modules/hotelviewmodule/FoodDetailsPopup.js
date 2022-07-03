import React, {forwardRef, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
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
    height: 200,
    borderRadius: 8,
    backgroundColor: GARY_1,
  },
  contentOverAll: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  ratingContainer: {
    marginTop: 2,
    marginBottom: 8,
  },
  ratingText: {
    marginHorizontal: 4,
  },
  choiceText: {marginTop: 20, marginBottom: 30},
  btnContainer: {
    marginVertical: 30,
  },
});

const FoodDetailsPopup = ({}, ref) => {
  const [isCount, setCount] = useState(0);

  return (
    <Flex>
      <RBSheet
        height={height - 100}
        ref={ref}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.25)',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <Flex between flex={1}>
          <ScrollView>
            <Flex>
              <View style={styles.imageStyle} />

              <Flex overrideStyle={styles.contentOverAll}>
                <Text size={16} bold>
                  Ground Beef Tacos
                </Text>
                <Flex row center overrideStyle={styles.ratingContainer}>
                  <SvgStar />
                  <Text bold overrideStyle={styles.ratingText}>
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
                  <Stepper value={isCount} onChange={setCount} />
                </Flex>

                <Text bold overrideStyle={styles.choiceText}>
                  Choice of Add On
                </Text>

                <Flex row center between>
                  <Text>Pepper Julienned</Text>
                  <Text>₹ 100</Text>
                </Flex>
              </Flex>
            </Flex>
          </ScrollView>
          <Flex center overrideStyle={styles.btnContainer}>
            <Button>Add item ₹ 210</Button>
          </Flex>
        </Flex>
      </RBSheet>
    </Flex>
  );
};

export default forwardRef(FoodDetailsPopup);
