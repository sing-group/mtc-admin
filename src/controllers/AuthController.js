//@flow

import {AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT} from 'admin-on-rest';

import {API_URL} from '../config';

import {create} from 'apisauce';

const api = create({
  baseURL: API_URL,
});

export const LOCAL_STORAGE_USER_CREDENTIALS_KEY = "token";
export const LOCAL_STORAGE_USER_ROLE_KEY = "role";
export const LOCAL_STORAGE_USER_NAME_KEY = "loginUser";

export const getUserRole = () => localStorage.getItem(LOCAL_STORAGE_USER_ROLE_KEY);

export const getUserName = () => localStorage.getItem(LOCAL_STORAGE_USER_NAME_KEY);

export const checkLoggedUser = (ROLE) => {
  return ROLE === getUserRole()
    ? getUserName()
    : undefined;
};

export const isUserInRole = (role) => getUserRole() === role;

export default async (type, params) => {
  // called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    const {username, password} = params;

    // obtains the role of user login
    const response = await api.get(`/user/role?login=${username}&password=${password}`);

    if (response.status !== 200) // invalid user
      return Promise.reject("common.invalidCredentials");

    const token = btoa(username + ":" + password);
    const permission = response.data;

    // saves the user credentials and role
    localStorage.setItem(LOCAL_STORAGE_USER_NAME_KEY, username);
    localStorage.setItem(LOCAL_STORAGE_USER_CREDENTIALS_KEY, token);
    localStorage.setItem(LOCAL_STORAGE_USER_ROLE_KEY, permission);

    return Promise.resolve({loginUser: username, permission: permission}); // returns a promise with the credentials of logged user. Will be saved in state
  }

  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem(LOCAL_STORAGE_USER_CREDENTIALS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USER_ROLE_KEY);
    return Promise.resolve();
  }

  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const {status} = params;

    if (status === 401 || status === 403) {
      localStorage.removeItem(LOCAL_STORAGE_USER_CREDENTIALS_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USER_ROLE_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USER_NAME_KEY);
      return Promise.reject();
    }
    return Promise.resolve();
  }

  // called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    // TODO: ask API is valid user???.
    // saves the user credentials anb role
    const token = atob(localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_KEY));
    return localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_KEY) ? Promise.resolve({loginUser: token.split(":")[0]}) : Promise.reject();
  }

  if (type === AUTH_GET_PERMISSIONS) {
    // returns de role saved
    return Promise.resolve(localStorage.getItem(LOCAL_STORAGE_USER_ROLE_KEY));
  }

  return Promise.reject('Unknown method');
};