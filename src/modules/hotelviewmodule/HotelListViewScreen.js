import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Flex from '../../uikit/Flex/Flex';
import {WHITE} from '../../uikit/UikitUtils/colors';
import ViewListScreen from './ViewListScreen';
import {
  getCategoryListMiddleWare,
  getFoodItemsMiddleWare,
} from './store/hotelListViewMiddleware';
import {useRoute} from '@react-navigation/native';
import Loader from '../../uikit/Loader/Loader';
import FilterModal from './FilterModal';
import {isEmpty} from '../../uikit/UikitUtils/validators';

const styles = StyleSheet.create({
  overAll: {
    backgroundColor: WHITE,
    flex: 1,
  },
});
const HotelListViewScreen = () => {
  const dispacth = useDispatch();
  const routes = useRoute();
  const [isLoader, setLoader] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [isFilter, setFilter] = useState('');
  const flatListRef = useRef();

  useEffect(() => {
    setLoader(true);
    if (routes && routes.params) {
      dispacth(getFoodItemsMiddleWare({HotelID: routes.params.hotelId})).then(
        () => {
          setLoader(false);
        },
      );
      dispacth(getCategoryListMiddleWare({HotelID: routes.params.hotelId}));
    }
  }, []);

  const {data, categoryList} = useSelector(
    ({getFoodItemsReducers, getCategoryListReducers}) => {
      return {
        data: getFoodItemsReducers.data,
        categoryList: getCategoryListReducers.data,
      };
    },
  );

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleFilter = value => {
    setFilter(value);
    setOpen(false);
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };
  const results = data.filter(
    option => option.CategoryName.toLowerCase() === isFilter.toLowerCase(),
  );
  const finalFilter = isEmpty(isFilter) ? data : results;
  if (isLoader) {
    return <Loader />;
  }
  return (
    <Flex overrideStyle={styles.overAll}>
      <FilterModal
        categoryList={categoryList}
        open={isOpen}
        close={handleClose}
        handleFilter={handleFilter}
        isFilter={isFilter}
        totalLength={data.length}
      />
      <ViewListScreen ref={flatListRef} data={finalFilter} handleOpen={handleOpen} />
    </Flex>
  );
};

export default HotelListViewScreen;
