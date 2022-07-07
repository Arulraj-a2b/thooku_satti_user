import React, {useCallback, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Button from '../../uikit/Button/Button';
import {
  BLACK,
  BORDER_COLOR,
  SUCCESS,
  WHITE,
} from '../../uikit/UikitUtils/colors';
import SvgEdit from '../../icons/SvgEdit';
import {useFormik} from 'formik';
import {useFocusEffect} from '@react-navigation/native';

const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
  },
  overAllFlex: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  addressInput: {
    textAlignVertical: 'top',
  },
  btnContainer: {
    paddingHorizontal: 24,
    borderTopColor: BORDER_COLOR,
    borderTopWidth: 1,
    paddingVertical: 20,
    backgroundColor: WHITE,
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

  return (
    <Flex style={styles.overAll}>
      <ScrollView style={{height: height - 160, backgroundColor: WHITE}}>
        <Flex overrideStyle={styles.overAllFlex}>
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
              value={formik.values?.address}
              disabled={!isEdit}
              height={130}
              types="normal"
              label={'Address'}
            />
          </View>
        </Flex>
      </ScrollView>
      <Flex overrideStyle={styles.btnContainer}>
        <Button>Save Changes</Button>
      </Flex>
    </Flex>
  );
};

export default AddressScreen;
