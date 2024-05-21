export const setCookie = (cookieName, cookieValue, cookieExp) => {
  let date = new Date();
  date.setTime(date.getTime() + cookieExp * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
};

