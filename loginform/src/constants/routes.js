export const routes = {
  defaultPage: "/",
  homePage: "/home",
  registerPage: "/register",
  loginPage: "/login",
};

export const API_URL = process.env.REACT_APP_API_URL;

export const HOME = `${API_URL}/api/home`;
export const REGISTER = `${API_URL}/api/register`;
export const LOGIN = `${API_URL}/api/login`;
