import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 44,
  height: 44,
  fill:"#FDA827"
};
const SvgPassword = ({width, height,fill}) => (
  <Svg width={width} height={height} viewBox="0 0 113 116" fill="none">
    <Path
      d="M100.67 99.9389C108.417 86.1099 116.341 64.507 111.539 38.567C107.526 16.885 89.359 1.14301 68.116 0.883014C45.802 0.610014 17.202 7.76892 3.16499 41.9649C-0.363007 50.5599 -0.246008 60.2449 3.52099 68.7359C10.445 84.3399 27.839 107.83 70.71 114.697C82.667 116.613 94.583 110.805 100.67 99.9389Z"
      fill={fill}
    />
    <Path
      d="M70.058 46.9399C70.058 46.7179 70.058 46.568 70.058 46.568C70.058 42.985 67.919 39.899 64.849 38.519C63.747 38.024 62.525 37.748 61.238 37.748H59.428C54.558 37.748 50.618 41.698 50.618 46.568C50.618 46.568 50.618 55.1641 50.618 55.8361"
      stroke="#FFFCFC"
      strokeWidth="5"
      strokeMiterlimit="10"
    />
    <Path
      d="M74.612 75.941H46.029C43.659 75.941 41.737 74.019 41.737 71.649V60.7321C41.737 58.3621 43.658 56.4399 46.029 56.4399H74.612C76.982 56.4399 78.904 58.3611 78.904 60.7321V71.649C78.904 74.019 76.983 75.941 74.612 75.941Z"
      stroke="#FFFCFC"
      strokeWidth="5"
      strokeMiterlimit="10"
    />
  </Svg>
);
SvgPassword.defaultProps = defaultProps;
export default SvgPassword;
