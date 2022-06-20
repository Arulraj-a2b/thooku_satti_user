import moment from "moment";
import { isEmpty } from "./validators";

export const isValidDate = (date) => {
  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) === false;
};

/**
 * Return the requested date format
 * @param value Date string or object
 * @param format returns the specified date format
 * @param isUnix converts to unix and returns unix formatted date
 * @param convertToLocal converts and returns to local timezone
 */
export const getDateString = (value, format, isUnix, convertToLocal) => {
  if (
    (typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "object") &&
    !Array.isArray(value) &&
    !isEmpty(format)
  ) {
    if (isUnix) {
      return moment.unix(Number(value)).format(format);
    } else {
      if (convertToLocal) return moment.parseZone(value).local().format(format);
      return moment.parseZone(value).format(format);
    }
  }
  return "";
};
