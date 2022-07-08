import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import DropDown from '../../uikit/DropDown/DropDown';

const styles = StyleSheet.create({
  overAll: {
    paddingHorizontal: 20,
  },
});
const TableBookingScreen = () => {
  
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);

  return (
    <Flex overrideStyle={styles.overAll}>
      <DropDown
        label={'Restaurants'}
        required
        value={value}
        setValue={setValue}
        data={items}
        setData={setItems}
      />
    </Flex>
  );
};

export default TableBookingScreen;
