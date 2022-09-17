import { FETCH_USER_LOGIN_SUCCESS } from "./actionTypes";
const doLogin = data => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};
export { doLogin };
