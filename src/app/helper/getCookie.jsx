import Cookies from "js-cookie";

export const getCookie = (name) => {
  return Cookies.get(name);
};

export const deleteCookie = (name) => {
  return Cookies.remove(name);
};
