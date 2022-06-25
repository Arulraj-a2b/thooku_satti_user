import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 14,
  height: 8,
};

const SvgHamburger = ({width, height}) => (
  <Svg width={width} height={height} viewBox="0 0 14 8" fill="none">
    <Path d="M1 1H13" stroke="#111719" strokeWidth="2" strokeLinecap="round" />
    <Path d="M1 7H9" stroke="#111719" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

SvgHamburger.defaultProps = defaultProps;

export default SvgHamburger;
