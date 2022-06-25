import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {routesPath} from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import {THIS_FIELD_REQUIRED} from '../../uikit/UikitUtils/constants';
import {isEmpty, isValidPassword} from '../../uikit/UikitUtils/validators';
import {ERROR, PRIMARY} from '../../uikit/UikitUtils/colors';
import SvgEyeOutline from '../../icons/SvgEyleOutLine';
import SvgEye from '../../icons/SvgEye';
import InputText from '../../uikit/InputText/InputText';
import SvgLock from '../../icons/SvgLock';
import SvgPassword from '../../icons/SvgPassword';

const styles = StyleSheet.create({
  overAll: {
    padding: 24,
  },
  title: {
    marginTop: 50,
  },
  desStyle: {
    marginBottom: 30,
  },
  btnStyle: {
    marginTop: 50,
    marginBottom: 30,
  },
  marginTop16: {
    marginTop: 20,
  },
});

const CreatePasswordScreen = () => {
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword1, setHidePassword1] = useState(true);
  const handleSubmit = () => {
    navigation.navigate(routesPath.CREATE_PASSWORD_SUCCESS);
  };

  const handleValidate = values => {
    const errors = {};

    if (isEmpty(values.password)) {
      errors.password = THIS_FIELD_REQUIRED;
    } else if (!isValidPassword(values.password)) {
      errors.password = `Password must be at least 8 - 12 characters long, at least one lowercase and one uppercase`;
    }

    if (isEmpty(values.confirmPassword)) {
      errors.confirmPassword = THIS_FIELD_REQUIRED;
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = `The two password fields didn't match.`;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {password: '', confirmPassword: ''},
    onSubmit: handleSubmit,
    validate: handleValidate,
  });

  return (
    <ScrollView>
      <Flex overrideStyle={styles.overAll}>
        <Text bold size={24} color="black" overrideStyle={styles.title}>
          Create Password
        </Text>
        <Text color="gray" overrideStyle={styles.desStyle}>
          Enter your new password and don’t forget again because it takes time
          return it
        </Text>
        <View style={styles.marginTop16}>
          <InputText
            maxLength={12}
            actionLeftStyle={{left: -4}}
            actionLeft={() => (
              <SvgLock
                fill={
                  formik.errors.password && formik.touched.password
                    ? ERROR
                    : PRIMARY
                }
              />
            )}
            placeholder="Password *"
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            name={'password'}
            touched={formik.touched}
            errors={formik.errors}
            error={formik.errors.password && formik.touched.password}
            secureTextEntry={hidePassword}
            actionRight={() => (
              <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                {hidePassword ? <SvgEyeOutline /> : <SvgEye />}
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.marginTop16}>
          <InputText
            maxLength={20}
            actionLeftStyle={{left: -4}}
            actionLeft={() => (
              <SvgPassword
                fill={
                  formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                    ? ERROR
                    : PRIMARY
                }
              />
            )}
            placeholder="Confirm password *"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange('confirmPassword')}
            name={'confirmPassword'}
            touched={formik.touched}
            errors={formik.errors}
            error={
              formik.errors.confirmPassword && formik.touched.confirmPassword
            }
            secureTextEntry={hidePassword1}
            actionRight={() => (
              <TouchableOpacity
                onPress={() => setHidePassword1(!hidePassword1)}>
                {hidePassword1 ? <SvgEyeOutline /> : <SvgEye />}
              </TouchableOpacity>
            )}
          />
        </View>
        <Button onClick={formik.handleSubmit} overrideStyle={styles.btnStyle}>
          Save
        </Button>
      </Flex>
    </ScrollView>
  );
};

export default CreatePasswordScreen;
