import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 36,
  height: 36,
};

const SvgRestaurantPinMap = ({width, height}) => (
  <Svg style={{borderRadius:100}} width={width} height={height} viewBox="0 0 315 406" fill="none">
    <Path
      d="M157.174 83.476c-39.97 0-72.465 32.515-72.465 72.475 0 39.95 32.496 72.475 72.465 72.475 39.96 0 72.465-32.525 72.465-72.475 0-39.95-32.505-72.475-72.465-72.475Zm0 139.86c-37.205 0-67.395-30.17-67.395-67.375 0-37.215 30.19-67.385 67.395-67.385 37.215 0 67.375 30.16 67.375 67.385.01 37.205-30.18 67.375-67.375 67.375ZM.539 0v314.287h98.864l58.259 91.058 58.269-91.058h98.874V0H.539Zm70.687 124.247c-.381 12.506-14.079 17.283-14.079 17.283v25.109h.02l-.01 57.761s-5.54 7.171-12.711 0v-82.89h.166c-8.363-3.556-14.538-4.778-14.929-17.274h-.059V85.079h6.272l3.068 37.85h7.406l.928-38.631h6.028l.733 38.631h8.705l1.993-37.85h6.507l.029 39.159-.067.009Zm85.948 111.077c-43.77 0-79.373-35.593-79.373-79.353 0-43.78 35.593-79.363 79.373-79.363 43.761 0 79.373 35.593 79.373 79.363-.01 43.76-35.612 79.353-79.373 79.353Zm126.602-83.564h-15.359v77.692h-17.733V82.489h17.733s24.191 30.659 15.359 69.271Zm-102.225 4.191c0 13.463-10.913 24.377-24.377 24.377-13.464 0-24.377-10.913-24.377-24.377 0-13.463 10.913-24.377 24.377-24.377 13.464 0 24.377 10.914 24.377 24.377Z"
      fill="#010002"
    />
  </Svg>
);

SvgRestaurantPinMap.defaultProps = defaultProps;

export default SvgRestaurantPinMap;
