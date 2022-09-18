import axios from "axios";
import NProgress from "nprogress";

import { store } from "../Redux/store";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

instance.interceptors.request.use(
  function (config) {
    const access_token = store?.getState()?.user?.account?.access_token;
    NProgress.start(); //start loading bar
    config.headers["Authorization"] = `Bearer ${access_token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    NProgress.done(); //stop loading bar
    return response && response.data ? response.data : response;
  },
  function (error) {
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
