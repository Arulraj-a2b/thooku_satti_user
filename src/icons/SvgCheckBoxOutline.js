import React, { memo } from "react";
import Svg, { Path } from "react-native-svg";

const defaultProps = {
  fill: "#dddddd",
  width: 24,
  height: 24,
  scale: 1,
};
const SvgCheckBoxOutline = ({ fill, width, height, scale }) => (
  <Svg width={width} height={height} scale={scale}>
    <Path d="M0 0h24v24H0V0z" fill="none" />
    <Path
      fill={fill}
      d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
    />
  </Svg>
);

SvgCheckBoxOutline.defaultProps = defaultProps;

export default memo(SvgCheckBoxOutline);
