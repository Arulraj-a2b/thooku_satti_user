import React, {useCallback, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useFormik} from 'formik';
import {useFocusEffect} from '@react-navigation/native';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import {BORDER_COLOR, WHITE} from '../../uikit/UikitUtils/colors';
import Button from '../../uikit/Button/Button';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
  },
  btnContainer: {
    paddingVertical: 20,
    borderTopColor: BORDER_COLOR,
    borderTopWidth: 1,
    paddingHorizontal: 40,
  },
  addressInput: {
    textAlignVertical: 'top',
  },
  scrollStyle: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

const AddressScreen = () => {
  const [isEdit, setEdit] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      address: '',
    },
  });

  useFocusEffect(
    useCallback(() => {
      // formik.setFieldValue('name', userDetails?.Name);
      // formik.setFieldValue('phone', userDetails?.MobileNo);
      // formik.setFieldValue('whatsapp', userDetails?.Whatsappno);
    }, []),
  );

  const btnText = !isEdit ? 'Edit Address' : 'Save Address';

  const handleSubmit = () => {
    setEdit(!isEdit);
  };
  return (
    <Flex overrideStyle={styles.overAll}>
      <ScrollView style={styles.scrollStyle}>
        <View style={{marginBottom: 30}}>
          <InputText
            disabled={!isEdit}
            value={formik.values.name}
            height={50}
            types="normal"
            label={'Full name'}
          />
        </View>
        <View style={{marginBottom: 30}}>
          <InputText
            value={formik.values.phone}
            disabled={!isEdit}
            height={50}
            types="normal"
            label={'Phone Number'}
          />
        </View>
        <View>
          <InputText
            overrideStyle={styles.addressInput}
            multiline
            numberOfLines={10}
            value={formik.values.address}
            disabled={!isEdit}
            height={130}
            types="normal"
            label={'Address'}
          />
        </View>
      </ScrollView>
      <Flex overrideStyle={styles.btnContainer}>
        <Button onClick={handleSubmit}>{btnText}</Button>
      </Flex>
    </Flex>
  );
};

export default AddressScreen;
