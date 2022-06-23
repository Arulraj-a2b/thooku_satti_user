import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 44,
  height: 44,
  fill:"#FDA827"
};

const SvgLocation = ({width, height,fill}) => (
  <Svg width={width} height={height} viewBox="0 0 114 115" fill="none">
    <Path
      d="M100.868 99.2309C108.615 85.4019 116.539 63.799 111.737 37.859C107.724 16.177 89.557 0.435006 68.314 0.175006C46 -0.0979935 17.4 7.06092 3.36299 41.2569C-0.165011 49.8519 -0.048008 59.5369 3.71899 68.0279C10.643 83.6319 28.037 107.122 70.908 113.989C82.865 115.904 94.781 110.097 100.868 99.2309Z"
      fill={fill}
    />
    <Path
      d="M77.769 40.944L63.906 78.572L58.955 59.7581L40.141 54.807L77.769 40.944Z"
      stroke="white"
      strokeWidth="5"
      strokeMiterlimit="10"
    />
    <Path
      d="M77.769 40.944L58.955 59.7581L40.141 54.807L77.769 40.944Z"
      fill="white"
    />
  </Svg>
);

SvgLocation.defaultProps = defaultProps;

export default SvgLocation;
