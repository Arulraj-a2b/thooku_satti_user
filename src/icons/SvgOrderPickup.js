import React from 'react';
import Svg, {Defs, LinearGradient, Stop, G, Rect, Path} from 'react-native-svg';

const defaultProps = {
  width: 40,
  height: 40,
};

const SvgOrderPickup = ({width, height}) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 280 625">
    <Path
      d="m66.12 160.476-49.966 16.147a7.126 7.126 0 1 0 4.382 13.562l49.968-16.146a7.127 7.127 0 0 0-4.383-13.563Z"
      fill="#333"
      stroke="#2E3436"
      strokeWidth={2.1}
      strokeLinecap="square"
    />
    <Path
      d="M165.849 28.592C165.849 13.906 155.078 2 141.791 2c-13.287 0-24.059 11.906-24.059 26.592v85.468c0 14.687 10.772 26.592 24.059 26.592s24.058-11.905 24.058-26.592V28.592Z"
      fill="#2E3436"
      stroke="#2E3436"
      strokeWidth={2.507}
      strokeLinecap="square"
    />
    <Path
      d="m72.782 188.145 5.698 8.863 23.425 6.331 15.194 15.195 6.965 7.598 8.864 5.697 18.993-1.266 6.964-4.432 6.964-10.129 13.929-12.029 24.691-4.432-.633-10.763-4.432-63.944-12.662-42.418-43.684-29.756h-10.13L88.609 86.216 75.947 127.37l-3.165 60.776Z"
      fill="#1A1A1A"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="M80.052 140.662s21.842-12.346 51.915-12.662c30.074-.317 67.11 12.346 67.11 12.346l-4.432-36.089-17.094-30.074-38.62-21.526-44.635 30.074-15.511 24.692 1.267 33.239Z"
      fill="url(#g3237_svg__a)"
    />
    <Path
      d="M55.158 120.08s3.165-33.556 13.928-44.319c10.763-10.763 70.592-39.252 70.592-39.252l1.583 18.044s-44.635 24.374-49.699 38.62c-5.065 14.245-9.496 30.074-10.446 39.886-.95 9.813-3.166 56.979-3.166 56.979l-18.993-7.281 1.583-39.57-4.749-18.677-.633-4.43Z"
      fill="#FE724C"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="m78.448 129.431-12.662-.633s-23.742-3.008-34.98 1.741C19.567 135.287 2 155.864 2 155.864l1.583 5.857s22.792 6.489 34.662 1.741c11.87-4.748 22.317-17.727 22.317-17.727l.633-5.223 14.72.474s2.058-1.582 3.007-5.856c.95-4.274-.475-5.698-.475-5.698v-.001Z"
      fill="#E59722"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="M73.61 197.521s-10.745 29.994-12.088 46.111c-1.343 16.117-.895 68.494-.895 68.494l20.593 30.889 7.163-33.128s31.783 65.36 51.483 66.258c8.544.388.041-144.602.041-144.602s-18.844-1.79-20.635-8.953c-1.791-7.163-2.238-7.163-2.238-7.163s-14.326-13.878-22.384-15.221-21.041-2.686-21.041-2.686v.001Z"
      fill="#FE724C"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="M82.108 340.771s10.296 8.058 10.296 21.488c0 13.431 5.82 32.682 5.82 32.682s-11.192 15.221-9.849 32.681c1.343 17.459 21.489 42.529 21.489 42.529l29.099 4.924 1.79-101.175s-21.936-9.849-25.965-19.698-25.965-44.767-25.965-44.767l-5.372 21.041-1.343 10.295Z"
      fill="#1A181B"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="M128.371 542.98c1.268-10.306-6.06-19.689-16.367-20.956-10.306-1.268-19.689 6.06-20.957 16.366l-7.704 62.652c-1.268 10.307 6.06 19.69 16.367 20.957 10.306 1.268 19.689-6.06 20.956-16.367l7.705-62.652Z"
      fill="#E59722"
      stroke="#2E3436"
      strokeWidth={2.507}
      strokeLinecap="square"
    />
    <Path
      d="M138.515 475.973v136.99s-8.953-9.849-12.982-15.668c-4.029-5.82-13.431-11.64-15.221-23.28-1.791-11.639-24.623-38.053-31.338-53.273-6.715-15.221-11.192-35.367-6.267-58.647 4.924-23.279 17.011-23.279 17.011-23.279l15.669 25.07 11.192 9.849 21.936 2.238Z"
      fill="#FE724C"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="m212.977 159.86 49.967 16.147a7.126 7.126 0 0 1-4.382 13.562l-49.967-16.147a7.126 7.126 0 0 1 4.382-13.562Z"
      fill="#333"
      stroke="#2E3436"
      strokeWidth={2.1}
      strokeLinecap="square"
    />
    <Path
      d="M225.082 120.08s-3.165-33.556-13.929-44.319c-10.762-10.763-70.908-39.252-70.908-39.252l.95 18.993s42.419 23.425 47.483 37.67c5.065 14.246 9.496 30.075 10.446 39.887.95 9.813 3.166 56.979 3.166 56.979l18.993-7.281-1.583-39.57 4.748-18.677.634-4.43Z"
      fill="#FE724C"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="m201.817 129.431 12.662-.633s23.742-3.008 34.981 1.741c11.237 4.748 28.805 25.325 28.805 25.325l-1.583 5.857s-22.792 6.489-34.662 1.741c-11.871-4.748-22.317-17.727-22.317-17.727l-.633-5.223-14.72.474s-2.058-1.582-3.007-5.856c-.95-4.274.474-5.698.474-5.698v-.001Z"
      fill="#E59722"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="M206.631 197.521s10.744 29.994 12.087 46.111c1.343 16.117.895 68.494.895 68.494l-20.593 30.889-7.163-33.128s-23.727 67.153-48.796 68.048c-8.547.305-3.993-146.707-3.993-146.707s20.109-1.475 21.9-8.638c1.791-7.163 2.238-7.162 2.238-7.162s14.326-13.879 22.384-15.222c8.059-1.343 21.041-2.686 21.041-2.686v.001Z"
      fill="#FE724C"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="M198.132 340.771s-10.297 8.058-10.297 21.488c0 13.431-5.82 32.682-5.82 32.682s11.192 15.221 9.849 32.681c-1.343 17.459-21.488 42.529-21.488 42.529l-29.099 4.924.672-100.952s19.474-10.073 23.503-19.921c4.029-9.849 25.965-44.768 25.965-44.768l5.372 21.041 1.343 10.296Z"
      fill="#1A181B"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="M151.719 542.961c-1.267-10.307 6.061-19.689 16.367-20.957 10.307-1.267 19.69 6.06 20.957 16.367l7.705 62.651c1.267 10.307-6.06 19.69-16.367 20.957-10.307 1.268-19.689-6.06-20.957-16.367l-7.705-62.651Z"
      fill="#E59722"
      stroke="#2E3436"
      strokeWidth={2.507}
      strokeLinecap="square"
    />
    <Path
      d="m137.688 475.973.895 136.99s12.088-9.849 16.117-15.668c4.029-5.82 13.43-11.64 15.221-23.28 1.791-11.639 24.622-38.053 31.337-53.273 6.716-15.221 11.192-35.367 6.268-58.647-4.925-23.279-17.012-23.279-17.012-23.279l-15.669 25.07-11.192 9.849-25.965 2.238Z"
      fill="#FE724C"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="M191.363 451.355c.335 13.711-5.82 27.176-5.82 39.844 0 22.78-22.384 42.573-22.384 65.808 0 13.129-15.669 17.199-15.669 26.86 0 2.832-2.686 10.89-2.686 8.058 0-4.667 85.752-115.374 46.558-140.569l.001-.001ZM94.492 267.14c1.376 5.152 4.44 9.783 6.044 14.998 2.583 8.393 7.733 16.158 9.849 24.622 9.275 37.101-16.727-18.772-23.056-21.936-.16-.081-12.745 28.875-12.31 28.875 2.622 0-2.293-14.04-2.687-15.221-3.277-9.832-1.415-22.548 0-32.455.914-6.395-2.847-54.841 4.253-54.841 14.378 0 4.16 50.804 17.907 55.959v-.001ZM182.839 267.14c-1.376 5.152-4.439 9.783-6.044 14.998-2.582 8.393-7.732 16.158-9.848 24.622-9.276 37.101 16.726-18.772 23.055-21.936.161-.081 12.746 28.875 12.311 28.875-2.623 0 2.293-14.04 2.686-15.221 3.278-9.832 1.416-22.548 0-32.455-.913-6.395 2.848-54.841-4.253-54.841-14.378 0-4.16 50.804-17.907 55.959v-.001Z"
      fill="#FE724C"
    />
    <Path
      d="M39.928 207.8c0-10.385-7.568-18.803-16.904-18.803-9.335 0-16.903 8.418-16.903 18.803v107.314c0 10.385 7.568 18.803 16.903 18.803 9.336 0 16.904-8.418 16.904-18.803V207.8Z"
      fill="#343485"
      stroke="#2E3436"
      strokeWidth={2.507}
      strokeLinecap="square"
    />
    <Path
      d="M87.448 452.683c-.336 13.712 5.82 27.176 5.82 39.844 0 22.781 22.383 42.574 22.383 65.809 0 13.129 15.669 17.198 15.669 26.86 0 2.831 2.686 10.889 2.686 8.058 0-4.667-85.752-115.375-46.557-140.57l-.001-.001Z"
      fill="#FE724C"
    />
    <Path
      d="m70.839 411.022.098 3.373c.628 21.537 18.594 38.442 40.129 37.758l59.261-1.88c21.534-.683 38.483-18.695 37.855-40.232l-.098-3.373c-.628-21.536-18.594-38.441-40.129-37.758l-59.261 1.88c-21.534.683-38.483 18.696-37.855 40.232Z"
      fill="#343485"
      stroke="#2E3436"
      strokeWidth={2.561}
      strokeLinecap="square"
    />
    <Path
      d="M187.427 319.206c0 33.917-20.692 61.411-46.217 61.411-25.526 0-46.216-27.494-46.216-61.411s20.692-61.412 46.216-61.412c25.527 0 46.217 27.495 46.217 61.412Z"
      fill="#E59722"
      stroke="#2E3436"
      strokeWidth={2.507}
      strokeLinecap="square"
    />
    <Path
      d="m17.002 325.145-.56.605c-7.05 7.625-6.583 19.521 1.042 26.571l55.882 51.664c7.625 7.049 19.521 6.583 26.57-1.042l.56-.606c7.05-7.625 6.583-19.521-1.042-26.57l-55.882-51.664c-7.625-7.05-19.52-6.583-26.57 1.042ZM235.574 206.897c0-10.384 7.568-18.802 16.903-18.802 9.336 0 16.904 8.418 16.904 18.802v107.315c0 10.384-7.568 18.802-16.904 18.802-9.335 0-16.903-8.418-16.903-18.802V206.897Z"
      fill="#343485"
      stroke="#2E3436"
      strokeWidth={2.507}
      strokeLinecap="square"
    />
    <Path
      d="m258.495 324.213.56.606c7.049 7.625 6.582 19.521-1.043 26.57l-55.882 51.664c-7.625 7.049-19.521 6.583-26.57-1.042l-.56-.606c-7.05-7.625-6.583-19.521 1.042-26.57l55.882-51.664c7.625-7.049 19.521-6.583 26.571 1.042Z"
      fill="#343485"
      stroke="#2E3436"
      strokeWidth={2.507}
      strokeLinecap="square"
    />
    <Path
      d="M106.977 299.882s11.08-22.792 34.504-22.159c30.104.813 36.72 19.626 36.72 19.626l3.166 26.274s-8.864-25.008-35.77-23.742c-26.908 1.266-39.886 23.425-39.886 23.425l1.266-23.424Z"
      fill="#2E3436"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="M77.52 175.484s37.039 12.03 37.986 13.296c.95 1.266-.316 6.964 5.382 8.23 5.698 1.267 9.496-4.748 14.878-4.748 5.381 0 11.712 6.331 18.36 5.382 6.648-.95 7.597-7.598 7.597-7.598l40.203-12.346-1.583-10.763-38.621 14.562s-6.331-2.533-13.295-2.533c-6.964 0-11.079 4.432-11.079 4.432s-5.382-3.482-10.13-4.748c-4.749-1.266-11.396 3.166-11.396 3.166l-36.72-15.828-1.582 9.496Z"
      fill="#333"
      stroke="#000"
      strokeWidth={2.507}
    />
    <Path
      d="M134.004 160.439c-1.98 7.252-12.678 10.648-23.893 7.585-11.216-3.062-18.702-11.424-16.721-18.676 1.98-7.253 12.678-10.649 23.893-7.586 11.215 3.063 18.702 11.425 16.721 18.677ZM146.386 160.439c1.98 7.252 12.678 10.648 23.893 7.585 11.216-3.062 18.702-11.424 16.721-18.676-1.98-7.253-12.677-10.649-23.893-7.586-11.215 3.063-18.702 11.425-16.721 18.677Z"
      fill="#333"
      stroke="#000"
      strokeWidth={2.507}
      strokeLinecap="square"
    />
    <Defs>
      <LinearGradient
        id="g3237_svg__a"
        x1={134.078}
        y1={115.966}
        x2={138.089}
        y2={14.357}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FF5935" />
        <Stop offset={1} stopColor="#999" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);

SvgOrderPickup.defaultProps = defaultProps;

export default SvgOrderPickup;
