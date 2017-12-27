import {
  AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT, USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "admin-on-rest";

import {create} from 'apisauce';
import {API_URL} from "../config";

const ADMIN = "ADMIN";
const MANAGER = "MANAGER";
const THERAPIST = "THERAPIST";
const PATIENT = "PATIENT";

export {
  ADMIN,
  MANAGER,
  THERAPIST,
  PATIENT
};

export default class AuthController {
  static get USER_CREDENTIALS_KEY() {
    return "token";
  }

  static get USER_ROLE_KEY() {
    return "role";
  }

  static get USER_NAME_KEY() {
    return "loginUser";
  }

  constructor(apiUrl) {
    this._apiUrl = apiUrl;
    this._api = create({
      baseURL: API_URL
    });
  }

  getUserRole() {
    return localStorage.getItem(AuthController.USER_ROLE_KEY);
  }

  _setUserRole(userRole) {
    localStorage.setItem(AuthController.USER_ROLE_KEY, userRole);
  }

  getUserName() {
    return localStorage.getItem(AuthController.USER_NAME_KEY);
  }

  _setUserName(userName) {
    localStorage.setItem(AuthController.USER_NAME_KEY, userName);
  }

  getUserCredentials() {
    return localStorage.getItem(AuthController.USER_CREDENTIALS_KEY);
  }

  _setUserCredentials(userCredentials) {
    localStorage.setItem(AuthController.USER_CREDENTIALS_KEY, userCredentials);
  }

  hasUserCredentials() {
    return localStorage.getItem(AuthController.USER_CREDENTIALS_KEY) !== null;
  }

  _clearCredentials(clearUser = true) {
    if (clearUser)
      localStorage.removeItem(AuthController.USER_NAME_KEY);

    localStorage.removeItem(AuthController.USER_CREDENTIALS_KEY);
    localStorage.removeItem(AuthController.USER_ROLE_KEY);
  }

  isUserInRole(role) {
    return this.getUserRole() === role;
  }

  checkLoggedUser(role) {
    return role === this.getUserRole() ? this.getUserName() : undefined;
  }

  async _manageAuthLogin(params) {
    const {username, password} = params;

    // obtains the role of user login
    const response = await this._api.get(`/user/role?login=${username}&password=${password}`);

    if (response.status !== 200) // invalid user
      return Promise.reject("common.invalidCredentials");

    const token = btoa(username + ":" + password);
    const permission = response.data;

    // saves the user credentials and role
    this._setUserName(username);
    this._setUserRole(permission);
    this._setUserCredentials(token);

    return Promise.resolve({loginUser: username, permission: permission}); // returns a promise with the credentials of logged user. Will be saved in state
  }

  _manageAuthLogout() {
    this._clearCredentials(false);

    return Promise.resolve();
  }

  _manageAuthError(params) {
    const {status} = params;

    if (status === 401 || status === 403) {
      this._clearCredentials();
      return Promise.reject();
    }

    return Promise.resolve();
  }

  _manageAuthCheck() {
    if (this.hasUserCredentials()) {
      return Promise.resolve({loginUser: this.getUserName()})
    } else {
      return Promise.reject("common.noCredentialsInLocalStorage");
    }
  }

  _manageAuthGetPermissions() {
    return this.getUserRole();
  }

  async manageAuthenticationAction(type, params) {
    switch (type) {
      case AUTH_LOGIN:
        return await this._manageAuthLogin(params);
      case AUTH_LOGOUT:
        return this._manageAuthLogout();
      case AUTH_ERROR:
        return this._manageAuthError();
      case AUTH_CHECK:
        return this._manageAuthCheck();
      case AUTH_GET_PERMISSIONS:
        return this._manageAuthGetPermissions();
      default:
        return Promise.reject("Unknown method");
    }
  }

  buildLoginReducer() {
    const initialState = {
      loginUser: this.getUserName(),
      permission: this.getUserRole()
    };

    return (previousState = initialState, {type, payload}) => {
      switch (type) {
        case USER_LOGIN_SUCCESS:
          return {
            loginUser: payload.loginUser,
            permission: payload.permission
          };
        case USER_LOGOUT:
          return {};
        default:
          return previousState;
      }
    }
  }
}