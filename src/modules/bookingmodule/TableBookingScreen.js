import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import DropDown from '../../uikit/DropDown/DropDown';
import {BORDER_COLOR, WHITE} from '../../uikit/UikitUtils/colors';
import Button from '../../uikit/Button/Button';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {useFormik} from 'formik';
import LabelWrapper from '../../uikit/InputText/LabelWrapper';
import {getDateString} from '../../uikit/UikitUtils/helpers';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import Stepper from '../../uikit/Stepper/Stepper';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../uikit/Loader/Loader';
import {
  GPAY_OR_PHONEPE,
  INVALID_PHONE_ENTERED,
  THIS_FIELD_REQUIRED,
} from '../../uikit/UikitUtils/constants';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import {diningBookingMiddleWare} from './store/tableBookingMiddleware';
import SuccessModal from './SuccessModal';
import Toast from '../../uikit/Toast/Toast';

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
  inputStyles: {
    textAlignVertical: 'top',
  },
});

const TableBookingScreen = () => {
  const addHoursToDate = (date, hours) => {
    return new Date(new Date(date).setHours(date.getHours() + hours));
  };
  const [isDate, setDate] = useState(new Date(1598051730000));
  const [isTime, setTime] = useState(addHoursToDate(new Date(), 2));
  const [value, setValue] = useState(null);
  const [isLoader, setLoader] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isData, setData] = useState();

  const dispatch = useDispatch();
  const {isLoading, data} = useSelector(({getRestaurantListReducers}) => {
    return {
      isLoading: getRestaurantListReducers.isLoading,
      data: getRestaurantListReducers.data,
    };
  });

  const handleValidate = values => {
    const errors = {};
    if (isEmpty(values.restaurants)) {
      errors.restaurants = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.guestName)) {
      errors.guestName = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.date)) {
      errors.date = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.time)) {
      errors.time = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.adult)) {
      errors.adult = THIS_FIELD_REQUIRED;
    } else if (Number(values.adult) === 0) {
      errors.adult = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.child)) {
      errors.child = THIS_FIELD_REQUIRED;
    } else if (Number(values.child) === 0) {
      errors.child = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.contactno)) {
      errors.contactno = THIS_FIELD_REQUIRED;
    } else if (!isEmpty(values.contactno) && values.contactno.length !== 10) {
      errors.contactno = INVALID_PHONE_ENTERED;
    }
    if (isEmpty(values.gpay) && isEmpty(values.gpay)) {
      errors.phonepe = GPAY_OR_PHONEPE;
      errors.gpay = GPAY_OR_PHONEPE;
    }
    if (!isEmpty(values.gpay) && values.gpay.length !== 10) {
      errors.gpay = INVALID_PHONE_ENTERED;
    }
    if (!isEmpty(values.phonepe) && values.phonepe.length !== 10) {
      errors.phonepe = INVALID_PHONE_ENTERED;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      restaurants: '',
      guestName: '',
      date: '',
      time: '',
      adult: 0,
      child: 0,
      gpay: '',
      phonepe: '',
      contactno: '',
      notes: '',
    },
    validate: handleValidate,
    onSubmit: () => handleSubmit(),
  });

  const handleSubmit = () => {
    setLoader(true);
    dispatch(
      diningBookingMiddleWare({
        HotleID: formik.values.restaurants,
        NoofAdult: formik.values.adult,
        Noofchild: formik.values.child,
        BookingDate: formik.values.date,
        Time: formik.values.time,
        GooglepayNo: formik.values.gpay,
        PhonePayNo: formik.values.phonepe,
        LocationID: '',
        Contactno: formik.values.contactno,
        Notes: formik.values.notes,
      }),
    )
      .then(res => {
        setLoader(false);
        console.log('res.payload', res.payload);
        if (res.payload && res.payload[0].StatusCode === 5999) {
          setData(res.payload[0]);
          setSuccess(true);
        } else if (res.payload && res.payload[0].Message) {
          Toast(res.payload[0].Message, 'error');
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };

  const onDateChange = (_event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    formik.setFieldValue('date', currentDate);
  };

  const onTimeChange = (_event, selectedDate) => {
    const currentDate = selectedDate;
    setTime(currentDate);
    formik.setFieldValue('time', currentDate);
  };

  const showDate = () => {
    DateTimePickerAndroid.open({
      value: isDate,
      onChange: onDateChange,
      mode: 'date',
      is24Hour: false,
      minimumDate: new Date(),
    });
  };

  const showTime = () => {
    DateTimePickerAndroid.open({
      value: isTime,
      onChange: onTimeChange,
      mode: 'time',
      is24Hour: false,
      minimumDate: new Date(),
    });
  };

  useEffect(() => {
    formik.setFieldValue('restaurants', value);
  }, [value]);

  const resetData = () => {
    setValue('');
    formik.resetForm();
  };
  return (
    <>
      <Flex overrideStyle={styles.overAll}>
        {(isLoading || isLoader) && <Loader />}
        <SuccessModal
          resetData={resetData}
          isData={isData}
          open={isSuccess}
          close={() => setSuccess(false)}
        />
        <ScrollView style={styles.scrollStyle}>
          <View style={styles.inputTop}>
            <DropDown
              valueKey="HotelID"
              labelKey="HotelName"
              placeholder={'Select Restaurants'}
              label={'Restaurants'}
              required
              value={value}
              setValue={setValue}
              data={data}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="restaurants"
            />
          </View>
          <View style={styles.inputTop}>
            <InputText
              placeholder={'Enter guest name'}
              height={50}
              types="normal"
              label={'Guest Name'}
              required
              value={formik.values.guestName}
              onChange={formik.handleChange('guestName')}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="guestName"
            />
          </View>
          <View style={styles.inputTop}>
            <InputText
              onChange={formik.handleChange('contactno')}
              label={'Contact Number'}
              value={formik.values.contactno}
              height={50}
              types="normal"
              placeholder={'Please enter your contact number'}
              keyboardType={'phone-pad'}
              maxLength={10}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="contactno"
            />
          </View>
          <View style={styles.inputTop}>
            <LabelWrapper label={'Date'} required>
              <TouchableOpacity
                onPress={showDate}
                style={{
                  height: 50,
                  borderWidth: 1,
                  borderColor: BORDER_COLOR,
                  borderRadius: 8,
                  justifyContent: 'center',
                  paddingHorizontal: 16,
                }}>
                {isEmpty(formik.values.date) ? (
                  <Text color="gray">Please select your date</Text>
                ) : (
                  <Text>{getDateString(formik.values.date, 'LL')}</Text>
                )}
              </TouchableOpacity>
            </LabelWrapper>
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="date"
            />
          </View>
          <View style={styles.inputTop}>
            <LabelWrapper label={'Time'} required>
              <TouchableOpacity
                onPress={showTime}
                style={{
                  height: 50,
                  borderWidth: 1,
                  borderColor: BORDER_COLOR,
                  borderRadius: 8,
                  justifyContent: 'center',
                  paddingHorizontal: 16,
                }}>
                {isEmpty(formik.values.time) ? (
                  <Text color="gray">Please select your time</Text>
                ) : (
                  <Text>{getDateString(formik.values.time, 'LT')}</Text>
                )}
              </TouchableOpacity>
            </LabelWrapper>
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="time"
            />
          </View>
          <View style={styles.inputTop}>
            <Flex between row center>
              <Flex row center>
                <Text bold>Adult *</Text>
                <Text size={12} color="gray">
                  {' (12+ Years)'}
                </Text>
              </Flex>
              <Stepper
                onChange={formik.setFieldValue}
                name="adult"
                value={formik.values.adult}
              />
            </Flex>
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="adult"
            />
          </View>
          <View style={styles.inputTop}>
            <Flex between row center>
              <Flex row center>
                <Text bold>Children *</Text>
                <Text size={12} color="gray">
                  {' (2 - 12 Years)'}
                </Text>
              </Flex>
              <Stepper
                value={formik.values.child}
                onChange={formik.setFieldValue}
                name="child"
              />
            </Flex>
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="child"
            />
          </View>

          <View style={styles.inputTop}>
            <InputText
              onChange={formik.handleChange('gpay')}
              label={'Google Pay Number'}
              value={formik.values.gpay}
              height={50}
              types="normal"
              placeholder={'Please enter your google pay number'}
              maxLength={10}
              keyboardType={'phone-pad'}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="gpay"
            />
          </View>
          <View style={styles.inputTop}>
            <InputText
              onChange={formik.handleChange('phonepe')}
              label={'Phone Pay Number'}
              value={formik.values.phonepe}
              height={50}
              types="normal"
              placeholder={'Please enter your phone pay number'}
              maxLength={10}
              keyboardType={'phone-pad'}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="phonepe"
            />
          </View>
          <View style={[styles.inputTop, {marginBottom: 70}]}>
            <InputText
              placeholder={`Add your rquest`}
              overrideStyle={styles.inputStyles}
              label={'Notes'}
              height={120}
              maxLength={1000}
              numberOfLines={4}
              multiline
              value={formik.values.notes}
              onChange={formik.handleChange('notes')}
              types="normal"
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="notes"
            />
          </View>
        </ScrollView>
        <Flex overrideStyle={styles.btnContainer}>
          <Button
            onClick={() => {
              Keyboard.dismiss();
              formik.handleSubmit();
            }}>
            Book
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default TableBookingScreen;
