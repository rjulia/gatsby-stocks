import api from "./api";
import { navigate } from "gatsby"
import TokenService from "./token.service";


const login = ({identifier, password}) => {
  return api
    .post("/auth/local", {
      identifier,
      password
    })
    .then((response) => {
      console.log("🚀 ~ file: auth.service.js:12 ~ .then ~ response", response)
      if (response.data.jwt) {
        TokenService.setUser(response.data);
      }

      return response;
    });
};

const logout = () => {
  TokenService.removeUser();
  navigate("/login")
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;