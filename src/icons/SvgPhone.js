import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 44,
  height: 44,
  fill:'#FDA827'
};

const SvgPhone = ({width, height,fill}) => (
  <Svg width={width} height={height} viewBox="0 0 113 115" fill="none">
    <Path
      d="M100.368 99.27C108.115 85.441 116.039 63.8379 111.237 37.8979C107.224 16.2159 89.057 0.473947 67.814 0.213947C45.5 -0.0590532 16.9 7.09998 2.86299 41.296C-0.665011 49.891 -0.548008 59.576 3.21899 68.067C10.143 83.671 27.537 107.161 70.408 114.028C82.365 115.944 94.281 110.136 100.368 99.27Z"
      fill={fill}
    />
    <Path
      d="M71.4189 93.2649H48.6189C44.6969 93.2649 41.5179 90.0858 41.5179 86.1638V33.4309C41.5179 29.5089 44.6969 26.3298 48.6189 26.3298H71.4189C75.3409 26.3298 78.52 29.5089 78.52 33.4309V86.1638C78.52 90.0858 75.3409 93.2649 71.4189 93.2649Z"
      stroke="white"
      strokeWidth="5"
      strokeMiterlimit="10"
    />
    <Path
      d="M60.019 88.416C62.0437 88.416 63.685 86.7747 63.685 84.75C63.685 82.7253 62.0437 81.084 60.019 81.084C57.9944 81.084 56.353 82.7253 56.353 84.75C56.353 86.7747 57.9944 88.416 60.019 88.416Z"
      stroke="#FFFCFC"
      strokeMiterlimit="10"
    />
  </Svg>
);

SvgPhone.defaultProps = defaultProps;

export default SvgPhone;
