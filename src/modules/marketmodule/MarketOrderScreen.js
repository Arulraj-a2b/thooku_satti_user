import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useCallback, useEffect, useState} from 'react';
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
import OrderSuccess from './OrderSuccess';
import Loader from '../../uikit/Loader/Loader';
import SvgUpload from '../../icons/SvgUpload';

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
  const [isSuccess, setSuccess] = useState();
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getCustomerInfoMiddleWare());
  }, []);

  const {isLoading, data, orderId} = useSelector(
    ({getCustomerInfoReducers, saveMarketOrderReducers}) => {
      return {
        isLoading: getCustomerInfoReducers.isLoading,
        data: getCustomerInfoReducers.data,
        orderId: saveMarketOrderReducers.data?.OrderNo,
      };
    },
  );
  const handleValidate = values => {
    const errors = {};

    if (isEmpty(values.address)) {
      errors.address = 'Address Field Requuired';
    }
    if (isEmpty(values.file)) {
      errors.file = 'Image Field Requuired';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {address: '', file: ''},
    onSubmit: value => handleSubmit(value),
    validate: handleValidate,
  });

  const handleSubmit = value => {
    setLoader(true);
    const formData = new FormData();
    formData.append('file', {
      uri: value.file?.uri,
      type: value.file?.type,
      name: value.file?.fileName,
    });
    formData.append('DeliveryAddress', value.address);
    if (params?.name.toLowerCase() === 'fruits') {
      formData.append('OrderType', 'FRT');
    } else if (params?.name.toLowerCase() === 'grocery') {
      formData.append('OrderType', 'GRO');
    } else if (params?.name.toLowerCase() === 'vegetables') {
      formData.append('OrderType', 'VBL');
    }
    dispatch(saveMarketOrderMiddleWare({formData}))
      .then(res => {
        if (res.payload) {
          setSuccess(true);
        }
        setLoader(false);
      })
      .then(() => {
        setLoader(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      formik.setFieldValue('address', data?.DeliveryAddress);
    }, [data]),
  );

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
    <>
      <OrderSuccess
        open={isSuccess}
        close={() => {
          formik.resetForm();
          setSuccess(false);
        }}
        orderId={orderId}
      />
      {isLoader && <Loader />}
      <ScrollView>
        <Flex overrideStyle={styles.overAll}>
          <Flex>
            <LabelWrapper label={`Upload ${params?.name} List`} required>
              {!isEmpty(formik.values.file) && (
                <>
                  <Image
                    source={{uri: formik.values.file?.uri}}
                    style={{height: 100, width: '100%'}}
                    resizeMode="contain"
                  />
                  <TouchableOpacity
                    onPress={chooseImage}
                    style={{marginTop: 20}}>
                    <Flex row center middle>
                      <SvgUpload />
                      <Text
                        bold
                        align={'center'}
                        color="link"
                        overrideStyle={{marginLeft: 8}}>
                        Change Image
                      </Text>
                    </Flex>
                  </TouchableOpacity>
                </>
              )}
              {isEmpty(formik.values.file) && (
                <TouchableOpacity onPress={chooseImage}>
                  <Flex row center middle>
                    <SvgUpload />
                    <Text
                      bold
                      align={'center'}
                      color="link"
                      overrideStyle={{marginLeft: 8}}>
                      Upload
                    </Text>
                  </Flex>
                </TouchableOpacity>
              )}
            </LabelWrapper>
            <ErrorMessage
              name={'file'}
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
          <View style={{marginVertical: 16}}>
            <InputText
              value={data?.Name}
              types="normal"
              label={'Customer Name'}
              disabled
            />
          </View>

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

          <Flex overrideStyle={{marginTop: 24}}>
            <Button onClick={formik.handleSubmit}>Save</Button>
          </Flex>
        </Flex>
      </ScrollView>
    </>
  );
};

export default MarketOrderScreen;
