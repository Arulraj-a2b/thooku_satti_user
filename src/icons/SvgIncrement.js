import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Svg, {Path, Rect, Line} from 'react-native-svg';
import Text from '../uikit/Text/Text';

const defaultProps = {
  width: 29,
  height: 29,
  fill: '#E59722',
};

const SvgIncrement = ({width, height, fill,isLoader}) => (
  <Svg width={width} height={height} viewBox="0 0 29 29" fill="none">
    <Rect
      x="0.719727"
      y="-3.05176e-05"
      width="28.2803"
      height="28.2803"
      rx="14.1402"
      fill={fill}
    />
    {isLoader ? (
      <View style={{position: 'relative', top: 4}}>
        <ActivityIndicator color={'#000000'} size={'small'} />
      </View>
    ) : (
      <>
        <Line
          x1="15.1566"
          y1="9.89961"
          x2="15.1566"
          y2="18.3809"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <Line
          x1="10.6195"
          y1="13.8437"
          x2="19.1008"
          y2="13.8437"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </>
    )}
  </Svg>
);

SvgIncrement.defaultProps = defaultProps;

export default SvgIncrement;
