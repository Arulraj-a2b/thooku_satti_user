import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 7,
  height: 12,
};

const SvgBack = ({width, height}) => (
  <Svg width={width} height={height} viewBox="0 0 7 12" fill="none">
    <Path
      d="M6 1L1 5.68393L5.81607 10.5"
      stroke="#111719"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

SvgBack.defaultProps = defaultProps;

export default SvgBack;
