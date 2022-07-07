import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 24,
  height: 24,
  fill: '#FE724C',
};

const SvgEdit = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      fill={fill}
      d="M1.438 16.872l-1.438 7.128 7.127-1.438 12.642-12.64-5.69-5.69-12.641 12.64zm2.271 2.253l-.85-.849 11.141-11.125.849.849-11.14 11.125zm20.291-13.436l-2.817 2.819-5.69-5.691 2.816-2.817 5.691 5.689z"
    />
  </Svg>
);

SvgEdit.defaultProps = defaultProps;

export default SvgEdit;
