import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 24,
  height: 24,
  fill: '#979797',
};

const SvgFilter = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 22 20" fill="none">
    <Path
      d="M8.38843 15.9141L1.85943 15.9141"
      stroke="#FBAE17"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M20.1404 15.9141L8.38838 15.9141"
      stroke="#FE724C"
      strokeOpacity="0.25"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M11.2063 15.7906C11.2063 14.1297 9.86315 12.7832 8.2063 12.7832C6.54944 12.7832 5.2063 14.1297 5.2063 15.7906C5.2063 17.4516 6.54944 18.798 8.2063 18.798C9.86315 18.798 11.2063 17.4516 11.2063 15.7906Z"
      fill="#FBAE17"
      stroke="#FBAE17"
      strokeWidth="1.5"
    />
    <Path
      d="M13.6113 3.63751L20.1403 3.63751"
      stroke="#FBAE17"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M1.85938 3.63751L13.6114 3.63751"
      stroke="#FE724C"
      strokeOpacity="0.25"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <Path
      d="M10.7935 3.76105C10.7935 5.42198 12.1366 6.76843 13.7935 6.76843C15.4503 6.76843 16.7935 5.42198 16.7935 3.76105C16.7935 2.10011 15.4503 0.753662 13.7935 0.753663C12.1366 0.753663 10.7935 2.10011 10.7935 3.76105Z"
      fill="#FBAE17"
      stroke="#FBAE17"
      strokeWidth="1.5"
    />
  </Svg>
);

SvgFilter.defaultProps = defaultProps;

export default SvgFilter;
