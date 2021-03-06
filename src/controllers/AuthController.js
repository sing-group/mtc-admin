/*
 * MultiTasking Cubes Administration
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Francisco Rojas Rodríguez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 * Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 * Carlos Spuch Calvar, and Tania Rivera Baltanás
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import {
  AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT, USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "admin-on-rest";

import {create} from "apisauce";
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
  static get KEY_CREDENTIALS() {
    return "mtc-admin.token";
  }

  static get KEY_ROLE() {
    return "mtc-admin.role";
  }

  static get KEY_USERNAME() {
    return "mtc-admin.username";
  }

  constructor(apiUrl) {
    this._apiUrl = apiUrl;
    this._api = create({
      baseURL: API_URL
    });
  }

  getUserRole() {
    return localStorage.getItem(AuthController.KEY_ROLE);
  }

  _setUserRole(userRole) {
    localStorage.setItem(AuthController.KEY_ROLE, userRole);
  }

  getUserName() {
    return localStorage.getItem(AuthController.KEY_USERNAME);
  }

  _setUserName(userName) {
    localStorage.setItem(AuthController.KEY_USERNAME, userName);
  }

  getUserCredentials() {
    return localStorage.getItem(AuthController.KEY_CREDENTIALS);
  }

  _setUserCredentials(userCredentials) {
    localStorage.setItem(AuthController.KEY_CREDENTIALS, userCredentials);
  }

  hasUserCredentials() {
    return localStorage.getItem(AuthController.KEY_CREDENTIALS) !== null;
  }

  _clearCredentials(clearUser = true) {
    if (clearUser)
      localStorage.removeItem(AuthController.KEY_USERNAME);

    localStorage.removeItem(AuthController.KEY_CREDENTIALS);
    localStorage.removeItem(AuthController.KEY_ROLE);
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
    if (response.data !== ADMIN && response.data !== MANAGER && response.data !== THERAPIST)
      return Promise.reject("common.invalidRole");

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
    if (this.hasUserCredentials()) {
      return this.getUserRole();
    } else {
      return Promise.reject();
    }
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
