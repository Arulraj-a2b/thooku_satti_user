import React from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SvgFav from '../../icons/SvgFav';
import SvgStar from '../../icons/SvgStar';
import Flex from '../../uikit/Flex/Flex';
import Card from '../../uikit/Card/Card';
import Text from '../../uikit/Text/Text';
import {BORDER_COLOR, PRIMARY, WHITE} from '../../uikit/UikitUtils/colors';
import SvgSuccess from '../../icons/SvgSccess';
import SvgClock from '../../icons/SvgClock';
import {routesPath} from '../../routes/routesPath';
import {isEmpty} from '../../uikit/UikitUtils/validators';
import {useDispatch} from 'react-redux';
import {checkCartExistMiddleWare} from '../mycartmodule/store/myCartMiddleware';

const styles = StyleSheet.create({
  overAll: {
    marginVertical: 8,
    marginHorizontal: 1,
  },
  imageStyle: {
    height: 136,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  ratingContainer: {
    position: 'absolute',
    paddingHorizontal: 16,
    top: 10,
    display: 'flex',
    width: '100%',
  },
  ratingBox: {
    backgroundColor: WHITE,
    borderRadius: 15,
    paddingHorizontal: 12,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countStyle: {
    marginLeft: 2,
  },
  svgFavStye: {
    backgroundColor: PRIMARY,
    borderRadius: 100,
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgSuccess: {
    marginLeft: 4,
  },
  nameListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
  },
});

const HotalCard = ({
  item,
  index,
  totalLength,
  isAll,
  getCartDetails,
  setCheckCart,
  setSelectHotelName,
}) => {
  const navigation = useNavigation();
  const dispacth = useDispatch();
  const checkIsCart = getCartDetails.length === 0;

  const handleNavigate = () => {
    if (checkIsCart) {
      navigation.navigate(routesPath.HOTEL_LIST_VIEW_SCREEN, {
        hotelId: item.HotelID,
      });
    } else {
      dispacth(checkCartExistMiddleWare({HotelID: item.HotelID})).then(res => {
        if (res.payload && res.payload[0].StatusCode === 6000) {
          navigation.navigate(routesPath.HOTEL_LIST_VIEW_SCREEN, {
            hotelId: item.HotelID,
          });
        } else {
          setSelectHotelName({name:item.HotelName,id:item.HotelID});
          setCheckCart(true);
        }
      });
    }
  };

  return (
    <Pressable onPress={handleNavigate}>
      <Card
        overrideStyle={[
          styles.overAll,
          {marginBottom: index + 1 === totalLength && isAll ? 50 : 8},
        ]}>
        <Flex>
          <Flex overrideStyle={styles.imageContainer}>
            {!isEmpty(item.HotelImage) && (
              <Image
                resizeMode="cover"
                source={{uri: item.HotelImage}}
                style={styles.imageStyle}
              />
            )}

            <View style={styles.ratingContainer}>
              <Flex row center between>
                <Card overrideStyle={styles.ratingBox}>
                  <Flex row center middle>
                    <SvgStar />
                    <Text size={12} bold overrideStyle={{marginLeft: 4}}>
                      4.0
                    </Text>
                  </Flex>
                </Card>
                <TouchableOpacity>
                  <Card overrideStyle={styles.svgFavStye}>
                    <SvgFav fill={WHITE} />
                  </Card>
                </TouchableOpacity>
              </Flex>
            </View>
          </Flex>

          <Flex overrideStyle={styles.nameListContainer}>
            <Flex row center>
              <Text bold size={14}>
                {item.HotelName}
              </Text>
              <View style={styles.svgSuccess}>
                <SvgSuccess height={10} width={10} />
              </View>
            </Flex>
            <Flex row center overrideStyle={{marginTop: 8}}>
              {/* <Flex row center>
            <View style={{marginRight: 4, marginBottom: 2}}>
              <SvgSuccess height={13} width={13} />
            </View>
            <Text color="gray" size={14}>
              Free delivery
            </Text>
          </Flex> */}
              <Flex row center>
                <View style={{marginRight: 4}}>
                  <SvgClock fill={PRIMARY} />
                </View>
                <Text color="gray" size={14}>
                  10-15 mins
                </Text>
              </Flex>
            </Flex>
            {/* <Flex overrideStyle={styles.chip}>
          <Text color="gray" size={12}>
            Burger
          </Text>
        </Flex> */}
          </Flex>
        </Flex>
      </Card>
    </Pressable>
  );
};

export default HotalCard;
