import React from "react";
import Svg, { Path } from "react-native-svg";

const defaultProps = {
  width: 44,
  height: 44,
};
const SvgUser = ({ width, height }) => (
  <Svg width={width} height={height} viewBox="0 0 113 116" fill="none">
    <Path
      d="M100.67 99.939C108.417 86.11 116.341 64.507 111.539 38.567C107.526 16.885 89.359 1.14301 68.116 0.883014C45.802 0.610014 17.202 7.76899 3.16499 41.965C-0.363007 50.56 -0.246008 60.245 3.52099 68.736C10.445 84.34 27.839 107.83 70.71 114.697C82.667 116.613 94.583 110.805 100.67 99.939Z"
      fill="#FDA827"
    />
    <Path
      d="M74.6141 77.21H46.0281C42.5011 77.21 39.6421 74.351 39.6421 70.824V69.205C39.6421 61.866 45.5911 55.917 52.9301 55.917H67.7121C75.0511 55.917 81.0001 61.866 81.0001 69.205V70.824C81.0001 74.351 78.1411 77.21 74.6141 77.21Z"
      stroke="white"
      strokeWidth="5"
      strokeMiterlimit="10"
    />
    <Path
      d="M60.3321 55.627H60.3091C55.5801 55.627 51.7461 51.793 51.7461 47.064V43.224C51.7461 38.495 55.5801 34.661 60.3091 34.661H60.3321C65.0611 34.661 68.8951 38.495 68.8951 43.224V47.064C68.8951 51.793 65.0611 55.627 60.3321 55.627Z"
      stroke="white"
      strokeWidth="5"
      strokeMiterlimit="10"
    />
  </Svg>
);

SvgUser.defaultProps = defaultProps;

export default SvgUser;
