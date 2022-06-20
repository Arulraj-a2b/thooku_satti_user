import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
  },
  around: {
    justifyContent: "space-around",
  },
  evenly: {
    justifyContent: "space-evenly",
  },
  middle: {
    justifyContent: "center",
  },
  top: {
    justifyContent: "flex-start",
  },
  bottom: {
    justifyContent: "flex-end",
  },
  center: {
    alignItems: "center",
  },
  start: {
    alignItems: "flex-start",
  },
  end: {
    alignItems: "flex-end",
  },
  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  columnReverse: {
    flexDirection: "column-reverse",
  },
  wrapReverse: {
    flexWrap: "wrap-reverse",
  },
  wrap: {
    flexWrap: "wrap",
  },
  common: {
    backgroundColor: "white",
  },
});

const defaultProps = {
  column: true,
};

export const isOverrideStyleArray = (str) => str !== undefined;

const Flex = ({
  children,
  between,
  around,
  evenly,
  center,
  start,
  end,
  middle,
  top,
  bottom,
  row,
  rowReverse,
  columnReverse,
  column,
  flex,
  overrideStyle,
  wrapReverse,
  wrap,
  onLayout,
  testID,
  nativeID,
}) => {
  let styleArray = [styles.column];
  const rowStyle = [];

  if (flex) {
    styleArray.push({ flex });
    rowStyle.push({ flex });
  }

  if (center) {
    styleArray.push(styles.center);
  } else if (start) {
    styleArray.push(styles.start);
  } else if (end) {
    styleArray.push(styles.end);
  }

  if (between) {
    styleArray.push(styles.between);
  } else if (around) {
    styleArray.push(styles.around);
  } else if (evenly) {
    styleArray.push(styles.evenly);
  } else if (middle) {
    styleArray.push(styles.middle);
  } else if (top) {
    styleArray.push(styles.top);
  } else if (bottom) {
    styleArray.push(styles.bottom);
  }

  // Flex directions
  if (row) {
    styleArray.push(styles.row);
  } else if (rowReverse) {
    styleArray.push(styles.rowReverse);
  } else if (columnReverse) {
    styleArray.push(styles.columnReverse);
  } else {
    styleArray.push(styles.column);
  }

  // Flex directions
  if (wrapReverse) {
    styleArray.push(styles.wrapReverse);
  } else if (wrap) {
    styleArray.push(styles.wrap);
  }

  if (overrideStyle) {
    if (isOverrideStyleArray(overrideStyle) && Array.isArray(overrideStyle)) {
      styleArray = [...styleArray, ...overrideStyle];
    } else {
      styleArray.push(overrideStyle);
    }
  }

  let flexComponent = null;
  if (!children) {
    return flexComponent;
  }
  if (row || rowReverse) {
    flexComponent = (
      <View style={rowStyle} onLayout={onLayout} testID={testID}>
        <View nativeID={nativeID} style={styleArray}>
          {children}
        </View>
      </View>
    );
  } else if (columnReverse || column) {
    flexComponent = (
      <View
        nativeID={nativeID}
        style={styleArray}
        onLayout={onLayout}
        testID={testID}
      >
        {children}
      </View>
    );
  }

  return flexComponent;
};

Flex.defaultProps = defaultProps;

export default Flex;
