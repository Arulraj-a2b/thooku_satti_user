import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormik} from 'formik';
import {useFocusEffect} from '@react-navigation/native';
import SvgProfileCamera from '../../icons/SvgProfileCamera';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Card from '../../uikit/Card/Card';
import {BORDER_COLOR, WHITE} from '../../uikit/UikitUtils/colors';
import Button from '../../uikit/Button/Button';
import { USER_DATA } from '../../utils/localStoreConstants';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  imageContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  svgProfileCamera: {
    position: 'absolute',
    zIndex: 11,
    bottom: -6,
    borderRadius: 100,
    right: 10,
  },
  btnContainer: {
    paddingVertical: 20,
    borderTopColor: BORDER_COLOR,
    borderTopWidth: 1,
    paddingHorizontal: 40,
  },
});
const MyProfileScreen = () => {
  const [isEdit, setEdit] = useState(false);

  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem(USER_DATA);
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: userDetails?.Name,
      phone: userDetails?.MobileNo,
      whatsapp: userDetails?.Whatsappno,
    },
  });

  useFocusEffect(
    useCallback(() => {
      formik.setFieldValue('name', userDetails?.Name);
      formik.setFieldValue('phone', userDetails?.MobileNo);
      formik.setFieldValue('whatsapp', userDetails?.Whatsappno);
    }, [userDetails]),
  );

  const btnText = !isEdit ? 'Edit Profile' : 'Save Profile';

  const handleSubmit = () => {
    setEdit(!isEdit);
  };
  return (
    <Flex overrideStyle={styles.overAll}>
      <ScrollView style={{paddingHorizontal: 20}}>
        <Flex>
          <Flex middle center overrideStyle={styles.imageContainer}>
            <Card overrideStyle={styles.svgProfileCamera}>
              <SvgProfileCamera />
            </Card>
            <Image
              source={require('../../assests/image/profile.png')}
              style={styles.imageStyle}
            />
          </Flex>
        </Flex>

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
            value={formik.values?.whatsapp}
            disabled={!isEdit}
            height={50}
            types="normal"
            label={'Whatsapp Number'}
          />
        </View>
      </ScrollView>
      <Flex overrideStyle={styles.btnContainer}>
        <Button onClick={handleSubmit}>{btnText}</Button>
      </Flex>
    </Flex>
  );
};

export default MyProfileScreen;
