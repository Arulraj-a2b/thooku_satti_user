import React, {useState} from 'react';
import Modal from 'react-native-modal';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {WHITE} from '../../uikit/UikitUtils/colors';
import Card from '../../uikit/Card/Card';
import Button from '../../uikit/Button/Button';
import SvgClose from '../../icons/SvgClose';
import {useFormik} from 'formik';
import InputText from '../../uikit/InputText/InputText';
import {useDispatch} from 'react-redux';
import {
  getDiningListMiddleWare,
  uploadBillMiddleWare,
} from './store/myOrderMiddleware';
import LabelWrapper from '../../uikit/InputText/LabelWrapper';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Toast from '../../uikit/Toast/Toast';
import Loader from '../../uikit/Loader/Loader';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    padding: 40,
    width: '90%',
    alignSelf: 'center',
    position: 'relative',
  },
  svgClose: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});

const DiningUpload = ({open, close, isBookingId}) => {
  const [isLoader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const handleValidate = values => {
    const errors = {};
    if (isEmpty(values.bill)) {
      errors.bill = 'Please provide bill amount';
    }
    if (isEmpty(values.billNo)) {
      errors.billNo = 'Please provide bill number';
    }
    if (isEmpty(values.image)) {
      errors.image = 'Please provide bill photo';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {bill: '', billNo: '', image: ''},
    onSubmit: () => handleSubmit(),
    validate: handleValidate,
  });

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
        formik.setFieldValue('image', source.assets[0]);
      }
    });
  };
  // const handleLaunchCamera = () => {
  //   launchCamera(
  //     {
  //       saveToPhotos: true,
  //       mediaType: 'photo',
  //       cameraType: 'back',
  //     },
  //     response => {
  //       if (response.didCancel) {
  //         console.log('User cancelled image picker');
  //       } else if (response.error) {
  //         console.log('ImagePicker Error: ', response.error);
  //       } else {
  //         let source = response;
  //         formik.setFieldValue(
  //           'image',
  //           source &&
  //             source.assets &&
  //             source.assets.length !== 0 &&
  //             source.assets[0],
  //         );
  //       }
  //     },
  //   );
  // };

  const handleSubmit = () => {
    setLoader(true);
    const formData = new FormData();
    formData.append('file', {
      uri: formik.values.image?.uri,
      type: formik.values.image?.type,
      name: formik.values.image?.fileName,
    });
    formData.append('Billamount', formik.values.bill);
    formData.append('BillRefNo', formik.values.billNo);
    formData.append('BookingID', isBookingId);
    dispatch(uploadBillMiddleWare({fromData: formData}))
      .then(res => {
        if (res.payload && res.payload[0].Message === 'Upload Done') {
          dispatch(getDiningListMiddleWare()).then(() => {
            Toast('Successfully Uploaded');
            formik.resetForm();
            close();
            setLoader(false);
          });
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };
  return (
    <>
      {isLoader && <Loader />}
      <Modal animationInTiming={0} animationIn="slideInLeft" isVisible={open}>
        <Card overrideStyle={styles.overAll}>
          <TouchableOpacity
            style={styles.svgClose}
            onPress={() => {
              formik.resetForm();
              close();
            }}>
            <SvgClose height={16} width={16} />
          </TouchableOpacity>
          <Flex row overrideStyle={{marginBottom: 8}}>
            <Text bold>Booking ID: </Text>
            <Text>{isBookingId}</Text>
          </Flex>
          <InputText
            keyboardType={'number-pad'}
            required
            types="normal"
            label={'Total Bill'}
            value={formik.values.bill}
            onChange={formik.handleChange('bill')}
          />
          <ErrorMessage
            name={'bill'}
            touched={formik.touched}
            errors={formik.errors}
          />
          <View style={{marginVertical: 8}}>
            <InputText
              required
              types="normal"
              label={'Bill Number'}
              value={formik.values.billNo}
              onChange={formik.handleChange('billNo')}
            />
            <ErrorMessage
              name={'billNo'}
              touched={formik.touched}
              errors={formik.errors}
            />
          </View>
          <LabelWrapper label={'Upload Bill'} required>
            {isEmpty(formik.values.image) ? (
              <Flex center>
                {/* <TouchableOpacity
                  style={{marginBottom: 8}}
                  onPress={handleLaunchCamera}>
                  <Text color="link" bold>
                    Choose Camera
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={chooseImage}>
                  <Text color="link" bold>
                    Choose Gallery
                  </Text>
                </TouchableOpacity>
              </Flex>
            ) : (
              <View>
                <Image
                  source={{uri: formik.values.image?.uri}}
                  style={{height: 100, width: '100%'}}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={{marginTop: 8}}
                  onPress={() => formik.setFieldValue('image', '')}>
                  <Text color="link" bold align={'center'}>
                    Clear
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </LabelWrapper>
          <ErrorMessage
            name={'image'}
            touched={formik.touched}
            errors={formik.errors}
          />
          <View style={{marginTop: 20}}>
            <Button onClick={formik.handleSubmit}>Upload</Button>
          </View>
        </Card>
      </Modal>
    </>
  );
};

export default DiningUpload;
