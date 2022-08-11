import {useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import Button from '../../uikit/Button/Button';
import InputText from '../../uikit/InputText/InputText';
import LabelWrapper from '../../uikit/InputText/LabelWrapper';
import Text from '../../uikit/Text/Text';
import HomePlaceHolder from '../homemodule/HomePlaceHolder';
import {
  getCustomerInfoMiddleWare,
  saveMarketOrderMiddleWare,
} from './store/marketOrderScreenMiddleware';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';

const styles = StyleSheet.create({
  overAll: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  marginBottom: {
    marginBottom: 16,
  },
  addressInput: {
    textAlignVertical: 'top',
  },
});

const MarketOrderScreen = () => {
  const dispatch = useDispatch();
  const {params} = useRoute();

  useEffect(() => {
    dispatch(getCustomerInfoMiddleWare());
  }, []);

  const {isLoading, data} = useSelector(({getCustomerInfoReducers}) => {
    return {
      isLoading: getCustomerInfoReducers.isLoading,
      data: getCustomerInfoReducers.data,
    };
  });

  const handleValidate = values => {
    const errors = {};

    if (isEmpty(values.address)) {
      errors.address = "Address Field Requuired";
    }
    if (isEmpty(values.file)) {
      errors.file = "Image Field Requuired";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {address: '', file: ''},
    onSubmit: value => handleSubmit(value),
    validate: handleValidate,
  });

  const handleSubmit = value => {
    const formData = new FormData();
    formData.append('file', {
      uri: value.file?.uri,
      type: value.file?.type,
      name: value.file?.fileName,
    });
    formData.append('DeliveryAddress', value.address);
    if (params?.type.toLowerCase() === 'fruits') {
      formData.append('OrderType', 'FRT');
    } else if (params?.type.toLowerCase() === 'grocery') {
      formData.append('OrderType', 'GRO');
    } else if (params?.type.toLowerCase() === 'vegetables') {
      formData.append('OrderType', 'VBL');
    }
    dispatch(saveMarketOrderMiddleWare({formData})).then(res => {
      console.log('res', res);
    });
  };

  useEffect(() => {
    formik.setFieldValue('address', data?.DeliveryAddress);
  }, [data]);

  const chooseImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        //  console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        formik.setFieldValue('file', source.assets[0]);
      }
    });
  };

  if (isLoading) {
    return <HomePlaceHolder />;
  }

  return (
    <ScrollView>
      <Flex overrideStyle={styles.overAll}>
        <Flex row overrideStyle={styles.marginBottom}>
          <Text bold>
            Order Type:{' '}
          </Text>
          <Text>{params?.type}</Text>
        </Flex>
        <InputText
          value={data?.Name}
          types="normal"
          label={'Customer Name'}
          disabled
        />
        <View style={styles.marginBottom}>
          <InputText
            value={data?.ContactNo}
            types="normal"
            label={'Mobile Number'}
            disabled
          />
        </View>
        <View style={styles.marginBottom}>
          <InputText
            value={data?.WhatsappNo}
            types="normal"
            label={'Whatsapp Number'}
            disabled
          />
        </View>
        <View style={styles.marginBottom}>
          <InputText
            required
            numberOfLines={5}
            maxLength={500}
            height={100}
            value={formik.values.address}
            types="normal"
            label={'Delivery Address'}
            onChange={formik.handleChange('address')}
            overrideStyle={styles.addressInput}
          />
          <ErrorMessage
            name={'address'}
            touched={formik.touched}
            errors={formik.errors}
          />
        </View>
        <Flex style={styles.marginBottom}>
          <LabelWrapper label={'Upload Order List'} required>
            {!isEmpty(formik.values.file) && (
              <>
                <Image
                  source={{uri: formik.values.file?.uri}}
                  style={{height: 100, width: '100%'}}
                  resizeMode="contain"
                />
                <TouchableOpacity onPress={chooseImage} style={{marginTop: 20}}>
                  <Text bold align={'center'} color="link">
                    Change Image
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {isEmpty(formik.values.file) && (
              <TouchableOpacity onPress={chooseImage}>
                <Text bold align={'center'} color="link">
                  Upload Image
                </Text>
              </TouchableOpacity>
            )}
          </LabelWrapper>
          <ErrorMessage
            name={'file'}
            touched={formik.touched}
            errors={formik.errors}
          />
        </Flex>
        <Flex overrideStyle={{marginTop: 24}}>
          <Button onClick={formik.handleSubmit}>Save</Button>
        </Flex>
      </Flex>
    </ScrollView>
  );
};

export default MarketOrderScreen;
