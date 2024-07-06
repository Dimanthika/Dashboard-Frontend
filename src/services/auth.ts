import axios from "axios";
import Cookies from "js-cookie";

// const API_URL = "http://localhost:8080/admin";
const API_URL = "http://52.54.109.5:8400/admin";

const setItemWithExpiry = (key: string, value: string, ttl: number) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

const getItemWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, {
      email,
      password,
    });

    setItemWithExpiry("user", response.data.user, 8 * 60 * 60 * 1000);
    Cookies.set("token", response.data.token, { expires: 8 / 24 });

    return response.data;
  } catch (error) {
    let formattedError = {
      message: "An unknown error occurred",
    };

    if (axios.isAxiosError(error) && error.response) {
      formattedError.message = error.response.data.message || error.message;
    }

    throw formattedError;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  Cookies.remove("token");
  window.location.href = "/log-in";
};

export const getCurrentUser = () => {
  const token = Cookies.get("token");
  return token ? getItemWithExpiry("user") : "";
};

export const getToken = () => {
  const token = Cookies.get("token");

  if (!token) {
    window.location.href = "/log-in";
  }
  return token ? token : {};
};
