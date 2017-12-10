import {USER_LOGIN_SUCCESS, USER_LOGOUT} from 'admin-on-rest';

import {LOCAL_STORAGE_USER_NAME_KEY, LOCAL_STORAGE_USER_ROLE_KEY} from '../customControllers/AuthController';

const initialState = {
  loginUser: localStorage.getItem(LOCAL_STORAGE_USER_NAME_KEY),
  permission: localStorage.getItem(LOCAL_STORAGE_USER_ROLE_KEY)
};
export default (previousState = initialState, {type, payload}) => {
  if (type == USER_LOGIN_SUCCESS) {
    return {
      loginUser: payload.loginUser,
      permission: payload.permission
    };
  }

  if (type == USER_LOGOUT) {
    return {};
  }

  return previousState;
}