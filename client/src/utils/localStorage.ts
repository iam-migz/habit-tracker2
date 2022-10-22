const LOCAL_STORAGE_KEY = '__auth__token__';

export function getStoredToken() {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
}

export function setStoredToken(userToken: string) {
  localStorage.setItem(LOCAL_STORAGE_KEY, userToken);
}

export function clearStoredToken() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
