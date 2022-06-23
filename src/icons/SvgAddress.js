import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 44,
  height: 44,
  fill:"#FDA827"
};

const SvgAddress = ({width, height,fill}) => (
  <Svg width={width} height={height} viewBox="0 0 114 115" fill="none">
    <Path
      d="M100.868 99.2309C108.615 85.4019 116.539 63.799 111.737 37.859C107.724 16.177 89.557 0.435006 68.314 0.175006C46 -0.0979935 17.4 7.06092 3.36299 41.2569C-0.165011 49.8519 -0.048008 59.5369 3.71899 68.0279C10.643 83.6319 28.037 107.122 70.908 113.989C82.865 115.904 94.781 110.097 100.868 99.2309Z"
      fill={fill}
    />
    <Path
      d="M45.779 40.238C37.636 48.381 37.636 61.5809 45.775 69.7209L60.518 84.464L75.261 69.7209C83.4 61.5819 83.4 48.381 75.257 40.238C67.119 32.099 53.919 32.099 45.779 40.238ZM65.664 60.123C62.82 62.967 58.217 62.967 55.373 60.123C52.533 57.283 52.529 52.676 55.373 49.832C58.213 46.992 62.823 46.992 65.664 49.832C68.508 52.677 68.504 57.283 65.664 60.123Z"
      stroke="white"
      strokeWidth="5"
      strokeMiterlimit="10"
    />
  </Svg>
);

SvgAddress.defaultProps = defaultProps;

export default SvgAddress;
