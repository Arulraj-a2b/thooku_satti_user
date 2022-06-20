import React, { memo } from "react";
import Svg, { G, Path, Rect } from "react-native-svg";

const defaultProps = {
  fill: "#37b4af",
  width: 24,
  height: 24,
  scale: 1,
};

const SvgCheckBox = ({ fill, width, height, scale }) => (
  <Svg width={width} height={height} scale={scale}>
    <G fill="none" transform="scale(.75) translate(4.5, 4.5)">
      <Rect fill={fill} width="100%" height="100%" rx={2} />
      <Path
        d="M18.328 6.293l-9.792 8.792-2.829-2.83a1 1 0 00-1.414 1.415l3.536 3.536a.997.997 0 001.414 0l9.5-9.5a.999.999 0 10-1.415-1.413"
        fill="#FFF"
      />
    </G>
  </Svg>
);

SvgCheckBox.defaultProps = defaultProps;

export default memo(SvgCheckBox);
