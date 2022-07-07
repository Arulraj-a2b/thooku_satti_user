import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import SvgProfileCamera from '../../icons/SvgProfileCamera';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Card from '../../uikit/Card/Card';
import {BLACK, SUCCESS, WHITE} from '../../uikit/UikitUtils/colors';
import SvgEdit from '../../icons/SvgEdit';
import SvgTick from '../../icons/SvgTick';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormik} from 'formik';
import {useFocusEffect} from '@react-navigation/native';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
    paddingHorizontal: 20,
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
});
const MyProfileScreen = () => {
  const [isEditName, setEditName] = useState(false);
  const [isEditPhone, setEditPhone] = useState(false);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
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

  return (
    <Flex overrideStyle={styles.overAll}>
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
          disabled={!isEditName}
          value={formik.values.name}
          height={50}
          types="normal"
          label={'Full name'}
          actionRight={() =>
            !isEditName ? (
              <TouchableOpacity onPress={() => setEditName(true)}>
                <SvgEdit fill={BLACK} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setEditName(false)}>
                <SvgTick fill={SUCCESS} />
              </TouchableOpacity>
            )
          }
        />
      </View>
      <View style={{marginBottom: 30}}>
        <InputText
          value={formik.values.phone}
          disabled={!isEditPhone}
          height={50}
          types="normal"
          label={'Phone Number'}
          actionRight={() =>
            !isEditPhone ? (
              <TouchableOpacity onPress={() => setEditPhone(true)}>
                <SvgEdit fill={BLACK} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setEditPhone(false)}>
                <SvgTick fill={SUCCESS} />
              </TouchableOpacity>
            )
          }
        />
      </View>
      <View>
        <InputText
          value={formik.values?.whatsapp}
          disabled={!isEditPhone}
          height={50}
          types="normal"
          label={'Whatsapp Number'}
          actionRight={() =>
            !isEditPhone ? (
              <TouchableOpacity onPress={() => setEditPhone(true)}>
                <SvgEdit fill={BLACK} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setEditPhone(false)}>
                <SvgTick fill={SUCCESS} />
              </TouchableOpacity>
            )
          }
        />
      </View>
    </Flex>
  );
};

export default MyProfileScreen;
