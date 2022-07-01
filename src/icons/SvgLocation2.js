import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 24,
  height: 24,
  fill: '#9796A1',
};

const SvgLocation2 = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fill={fill}
      d="M20.586 3.417l-6.938 6.934-6.932-1.733 13.87-5.201zm3.414-3.417l-24 9 12 3 3.014 12 8.986-24z"
    />
  </Svg>
);

SvgLocation2.defaultProps = defaultProps;

export default SvgLocation2;
