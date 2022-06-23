import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 44,
  height: 44,
  fill:"#FDA827"
};

const SvgLock = ({width, height,fill}) => (
  <Svg width={width} height={height} viewBox="0 0 114 115" fill="none">
    <Path
      d="M100.868 99.4549C108.615 85.6259 116.539 64.023 111.737 38.083C107.724 16.401 89.557 0.659005 68.314 0.399005C46 0.126005 17.4 7.28492 3.36299 41.4809C-0.165011 50.0759 -0.048008 59.7609 3.71899 68.2519C10.643 83.8559 28.037 107.346 70.908 114.213C82.865 116.129 94.781 110.321 100.868 99.4549Z"
      fill={fill}
    />
    <Path
      d="M70.256 53.667C70.256 53.445 70.256 46.2 70.256 46.2C70.256 42.617 68.117 39.531 65.047 38.151C63.945 37.656 62.723 37.38 61.436 37.38H59.626C54.756 37.38 50.816 41.33 50.816 46.2C50.816 46.2 50.816 54.796 50.816 55.468"
      stroke="#FFFCFC"
      strokeWidth="5"
      strokeMiterlimit="10"
    />
    <Path
      d="M74.8099 75.572H46.2269C43.8569 75.572 41.9349 73.651 41.9349 71.28V60.363C41.9349 57.993 43.8559 56.071 46.2269 56.071H74.8099C77.1799 56.071 79.1019 57.992 79.1019 60.363V71.28C79.1019 73.651 77.1809 75.572 74.8099 75.572Z"
      stroke="#FFFCFC"
      strokeWidth="5"
      strokeMiterlimit="10"
    />
  </Svg>
);

SvgLock.defaultProps = defaultProps;

export default SvgLock;
