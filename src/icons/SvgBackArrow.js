import React from "react";
import Svg, { Path } from "react-native-svg";

const defaultProps = {
  fill: "#1A1A1A",
  width: 24,
  height: 24,
};

const SvgBackArrow = ({ width, height, fill, style }) => (
  <Svg width={width} height={height} style={style}>
    <Path
      d="M20 10.923H6.414L9.63 7.707a.999.999 0 1 0-1.414-1.414l-4.923 4.923a.999.999 0 0 0 0 1.414l4.923 4.923a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414l-3.216-3.216H20a1 1 0 1 0 0-2"
      fill={fill}
      fillRule="evenodd"
    />
  </Svg>
);

SvgBackArrow.defaultProps = defaultProps;

export default SvgBackArrow;
