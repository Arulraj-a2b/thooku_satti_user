import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 19,
  height: 18,
  fill: '#FFC529',
};

const SvgFav = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 19 18" fill="none">
    <Path
      d="M13.7098 0.73822C12.8417 0.738372 11.9892 0.970156 11.2399 1.40977C10.4907 1.84939 9.87168 2.48099 9.44644 3.23973C9.0211 2.48081 8.40189 1.84909 7.65241 1.40946C6.90294 0.969838 6.05022 0.738156 5.18187 0.73822C3.85195 0.810223 2.60092 1.39343 1.68902 2.36653C0.777116 3.33963 0.274549 4.62769 0.285862 5.96278C0.285862 12.771 9.44644 17.5208 9.44644 17.5208C9.44644 17.5208 18.607 12.7735 18.607 5.96278C18.6183 4.62749 18.1156 3.33926 17.2034 2.36613C16.2913 1.393 15.0399 0.809921 13.7098 0.73822V0.73822Z"
      fill={fill}
    />
  </Svg>
);

SvgFav.defaultProps = defaultProps;

export default SvgFav;
