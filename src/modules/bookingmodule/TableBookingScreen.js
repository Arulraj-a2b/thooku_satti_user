import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import DropDown from '../../uikit/DropDown/DropDown';
import {BORDER_COLOR, WHITE} from '../../uikit/UikitUtils/colors';
import Button from '../../uikit/Button/Button';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
  },
  scrollStyle: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  btnContainer: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderTopColor: BORDER_COLOR,
    borderTopWidth: 1,
  },
  inputTop: {
    marginBottom: 20,
  },
});

const TableBookingScreen = () => {
  const [date, setDate] = useState(new Date(1598051730000));

  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  const onChange = (_event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
console.log('date',date);
  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <Flex overrideStyle={styles.overAll}>
      <ScrollView style={styles.scrollStyle}>
        <View style={styles.inputTop}>
          <DropDown
            placeholder={'Select Restaurants'}
            label={'Restaurants'}
            required
            value={value}
            setValue={setValue}
            data={items}
            setData={setItems}
          />
        </View>
        <View style={styles.inputTop}>
          <InputText
            placeholder={'Enter guest name'}
            height={50}
            types="normal"
            label={'Guest Name'}
            required
          />
        </View>
        <View style={styles.inputTop}>
          <TouchableOpacity onPress={showDatepicker}>
            <InputText
              placeholder={'Please select your date'}
              height={50}
              types="normal"
              label={'Date'}
              required
              value={date}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputTop}>
          <TouchableOpacity onPress={showTimepicker}>
            <InputText
              editable={false}
              placeholder={'Please select your time'}
              height={50}
              types="normal"
              label={'Time'}
              required
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Flex overrideStyle={styles.btnContainer}>
        <Button>Book</Button>
      </Flex>
    </Flex>
  );
};

export default TableBookingScreen;
