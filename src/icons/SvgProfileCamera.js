import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const defaultProps = {
  width: 27,
  height: 27,
  fill: '#FE724C',
};

const SvgProfileCamera = ({width, height}) => (
  <Svg width={width} height={height} viewBox="0 0 27 27" fill="none">
    <Circle cx="13.5" cy="13.5" r="13.5" fill="white" />
    <Path
      d="M13.4997 16.1501C14.411 16.1501 15.1497 15.4114 15.1497 14.5001C15.1497 13.5889 14.411 12.8502 13.4997 12.8502C12.5885 12.8502 11.8497 13.5889 11.8497 14.5001C11.8497 15.4114 12.5885 16.1501 13.4997 16.1501Z"
      fill="#B3B3B3"
    />
    <Path
      d="M17.8999 10.1H16.1564L15.4744 9.3575C15.3719 9.24496 15.2471 9.15505 15.1079 9.09349C14.9687 9.03194 14.8181 9.00009 14.6659 9H12.334C12.026 9 11.729 9.132 11.52 9.3575L10.8435 10.1H9.09999C8.495 10.1 8 10.595 8 11.2V17.7999C8 18.4049 8.495 18.8999 9.09999 18.8999H17.8999C18.5049 18.8999 18.9999 18.4049 18.9999 17.7999V11.2C18.9999 10.595 18.5049 10.1 17.8999 10.1ZM13.4999 17.2499C11.982 17.2499 10.75 16.0179 10.75 14.4999C10.75 12.982 11.982 11.75 13.4999 11.75C15.0179 11.75 16.2499 12.982 16.2499 14.4999C16.2499 16.0179 15.0179 17.2499 13.4999 17.2499Z"
      fill="#B3B3B3"
    />
  </Svg>
);

SvgProfileCamera.defaultProps = defaultProps;

export default SvgProfileCamera;
