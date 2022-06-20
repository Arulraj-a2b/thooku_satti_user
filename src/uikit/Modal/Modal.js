import React, { memo, useEffect, useState } from "react";
import { StyleSheet, Platform, Pressable } from "react-native";
import Flex from "../Flex/Flex";
import { ZINDEX_MODAL } from "../UikitUtils/constants";

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    zIndex: ZINDEX_MODAL,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: Platform.OS === "web" ? "100vw" : "100%",
    height: Platform.OS === "web" ? "100vh" : "100%",
    position: "absolute",
  },
});

const Modal = ({ open, children, onClose, disable }) => {
  const [containerStyle, setContainerStyle] = useState < {} > [];
  useEffect(() => {
    const containerStyleArray = [styles.container];
    setContainerStyle(containerStyleArray);
  }, [open]);

  return open ? (
    <Pressable
      disabled={disable}
      style={containerStyle}
      onPress={onClose}
      testID="Modal"
    >
      <Flex>{children}</Flex>
    </Pressable>
  ) : null;
};

export default memo(
  Modal,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
