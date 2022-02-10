import jwtDecode from "jwt-decode";

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? "notapp-api";
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? "notapp$secret$here";

type LoginResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  username: string;
};

type AccessToken = {
  exp: number;
  user_name: string;
};

export const saveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem("authData", JSON.stringify(loginResponse));
};

export const getSessionData = () => {
  const sessionData = localStorage.getItem("authData") ?? "{}";
  return JSON.parse(sessionData) as LoginResponse;
};

export const getAccessTokenDecoded = () => {
  const sessionData = getSessionData();

  try {
    const tokenDecoded = jwtDecode(sessionData.access_token);
    return tokenDecoded as AccessToken;
  } catch (error) {
    return {} as AccessToken;
  }
};

export const isTokenValid = () => {
  const { exp } = getAccessTokenDecoded();
  return Date.now() <= exp * 1000;
};

export const isAuthenticated = () => {
  const sessionData = getSessionData();
  return sessionData.access_token && isTokenValid();
};

export const logout = () => {
  localStorage.removeItem("authData");
};
