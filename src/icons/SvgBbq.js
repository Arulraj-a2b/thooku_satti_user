import React from 'react';
import Svg, {Path} from 'react-native-svg';

const defaultProps = {
  width: 100,
  height: 100,
  fill: '#FE724C',
};

const SvgBbq = ({width, height, fill}) => (
  <Svg width={width} height={height} viewBox="0 0 122.88 117.21" fill="none">
    <Path
      fill={fill}
      d="M116.52 117.21 96.71 71l-3.8 4.69 17 41.5h-5.35L89 78.32c-16 11.21-38.21 11.54-54.39.52l-15 38.37h-5.39l16-39.95c-2.34-2-3.26-3.78-5.08-6.28L5.4 117.21H0l21.92-51.42a52.86 52.86 0 0 1-7.12-17.43H9.29c-.88 0-1.61-1.14-1.61-2.56s.73-2.55 1.61-2.55h4.6c-.18-1.37-.33-2.76-.44-4.19-.09-1.21-.26-2.15.56-3.22a2.77 2.77 0 0 1 2-1.11h.21l89.51.19h1.25a2.66 2.66 0 0 1 2.54 1.83 6.67 6.67 0 0 1 0 2.09c-.09 1.51-.23 3-.42 4.42h4.47c.89 0 1.61 1.14 1.61 2.55s-.72 2.56-1.61 2.56h-5.36A51.55 51.55 0 0 1 100.93 66l21.95 51.17ZM36.8 30.41a2.31 2.31 0 0 1-3.27-3.27c1.71-1.71.9-3.22 0-5-1.76-3.14-3.74-6.89-.36-12.74a2.31 2.31 0 1 1 4 2.32c-2.1 3.62-.76 6.12.4 8.29 1.81 3.37 3.36 6.28-.76 10.4Zm37.44-11.52A2.31 2.31 0 0 1 71 22.16c-4.13-4.13-2.57-7-.77-10.4 1.17-2.18 2.5-4.67.41-8.3a2.31 2.31 0 1 1 4-2.31C78 7 76 10.7 74.27 13.92c-.94 1.75-1.74 3.26 0 5Zm15.82 8.25a2.31 2.31 0 1 1-3.27 3.27c-4.12-4.12-2.56-7-.76-10.4 1.16-2.17 2.5-4.67.4-8.29a2.31 2.31 0 1 1 4-2.32c3.38 5.85 1.4 9.55-.33 12.78-.93 1.74-1.74 3.25 0 5Zm-37.44-4.86A2.31 2.31 0 1 1 49.35 19c1.72-1.71.91-3.22 0-5-1.75-3.18-3.73-6.88-.35-12.73a2.31 2.31 0 0 1 4 2.31c-2.09 3.63-.76 6.12.41 8.3 1.8 3.37 3.36 6.28-.77 10.4Z"
    />
  </Svg>
);

SvgBbq.defaultProps = defaultProps;

export default SvgBbq;