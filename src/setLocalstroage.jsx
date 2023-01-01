function getToken(name) {
  if (window.localStorage) {
    return localStorage.getItem(name);
  }
  return "";
}

function setToken(name, value) {
  if (window.localStorage) {
    localStorage.setItem(name, value);
  }
}

function removeToken(name) {
  if (window.localStorage) {
    localStorage.removeItem(name);
  }
}

export { getToken, setToken, removeToken };
