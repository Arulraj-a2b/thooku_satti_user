import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 40,
  height: 40,
  fill: '#000000',
};

const SvgHomeLocation = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 50 50" fill="none">
    <Path fill={fill} d="M25 2C16.178 2 9 9.178 9 18c0 12.078 14.628 28.944 15.25 29.656.19.217.462.344.75.344s.56-.128.75-.344C26.372 46.947 41 30.151 41 18c0-8.822-7.178-16-16-16zm0 9.844 8 4.812-1 1.688V26H18v-7.656l-1-1.688 8-4.812zm0 2.312-5 3V24h3v-5h4v5h3v-6.844l-5-3z" />
  </Svg>
);

SvgHomeLocation.defaultProps = defaultProps;

export default SvgHomeLocation;
