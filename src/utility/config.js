export const BASE_URL = "https://foodapp.appsure.co.in/api/";

export const fetchUrl = (url) => {
  const result = `${BASE_URL}${url}`;
  return result;
};
