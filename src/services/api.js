import axios from "axios";
import TokenService from "./token.service";


async function getRefresTokken() {

    const config = {
      "Access-Control-Allow-Credentials": true,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
    }
    console.log("🚀 ~ file: api.js:17 ~ getRefresTokken ~ TokenService.getLocalRefreshToken()", TokenService.getLocalRefreshToken())
    const rs = await axios.post("http://localhost:1337/api/token/refresh", {
      refreshToken: TokenService.getLocalRefreshToken(),
    }, config)

    return rs
    console.log("🚀 ~ file: api.js:18 ~ getRefresTokke ~ rs", rs)
}

const instance = axios.create({
  baseURL: "http://localhost:1337/api",
  "Access-Control-Allow-Credentials": true,
  withCredentials: true,
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

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/local" && err.response) {
      //     Access Token was expired
      if (err.response.status === 401 && !originalConfig.retry) {
        originalConfig.retry = true;

        
        try {
          const rs = await getRefresTokken()

          const { jwt } = rs.data;
          console.log("🚀 ~ file: api.js:62 ~ jwt", jwt)
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