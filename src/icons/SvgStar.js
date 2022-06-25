import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 11,
  height: 10,
  fill: '#FFC529',
};

const SvgStar = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 11 10" fill="none">
    <Path
      d="M8.94083 9.44598L5.88729 7.84144L2.83258 9.44598L3.41732 6.0451L0.943848 3.63712L4.35876 3.14125L5.88729 0L7.41581 3.14125L10.8307 3.63712L8.35725 6.04627L8.94083 9.44598Z"
      fill={fill}
    />
  </Svg>
);

SvgStar.defaultProps = defaultProps;

export default SvgStar;
