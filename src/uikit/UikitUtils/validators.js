import { Platform } from "react-native";

export const isEmpty = (value) =>
  value === undefined || value === null || value === "";

export const secureImage = (imageUrl) => {
  if (isEmpty(imageUrl)) {
    return "";
  }
  if (Platform.OS === "web") {
    return imageUrl.replace(/(http:\/\/)/, "//").replace(/\s/g, "%20");
  }
  return imageUrl.replace(/(http:\/\/)/, "https://").replace(/\s/g, "%20");
};
