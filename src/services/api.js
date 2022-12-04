import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Accept: 'application/json',
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
let count = 5
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/local" && err.response) {
      //     Access Token was expired
      if (err.response.status === 401 && !originalConfig.retry && count !== 0) {
        originalConfig.retry = true;
        try {
          const rs = await instance.post("/token/refresh", {
            refreshToken: TokenService.getLocalRefreshToken(),
          }, {
            "Access-Control-Allow-Credentials": true,
            withCredentials: true,
          });

          const { jwt } = rs;
          TokenService.updateLocalAccessToken(jwt);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;