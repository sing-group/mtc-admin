//@flow

import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK,AUTH_GET_PERMISSIONS } from 'admin-on-rest';

import {GENERAL_ADMIN, CENTER_DIRECTOR, THERAPIST} from './permissions'

import {create} from 'apisauce'

const api = create({
  baseURL: 'http://localhost:8080',
})

export const LOCAL_STORAGE_USER_CREDENTIALS_KEY = "token"
export const LOCAL_STORAGE_USER_ROLE_KEY = "role"

export default async (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const { username , password} = params;

        // obtains the role of user login
        const response = await api.get(`/mtc/rest/api/user/role?login=${username}&password=${password}`)

        if (response.status != 200) // invalid user
            return Promise.reject("common.invalidCredentials")

        const token = btoa(username+":"+password)
        const permission = response.data

        console.log("LOGGED USER", token, permission)
        // saves the user credentials anb role
        localStorage.setItem(LOCAL_STORAGE_USER_CREDENTIALS_KEY, token);
        localStorage.setItem(LOCAL_STORAGE_USER_ROLE_KEY, permission);

        return Promise.resolve({login: username}); // returns a promise with the credentials of logged user. Will be saved in state
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem(LOCAL_STORAGE_USER_CREDENTIALS_KEY);
        localStorage.removeItem(LOCAL_STORAGE_USER_ROLE_KEY);
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem(LOCAL_STORAGE_USER_CREDENTIALS_KEY);
            localStorage.removeItem(LOCAL_STORAGE_USER_ROLE_KEY);
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        // TODO: ask API is valid user???.
        console.log("NEW LOCATION", type, params)
        return localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_KEY) ? Promise.resolve() : Promise.reject();
    }

    if (type === AUTH_GET_PERMISSIONS) {
        // returns de role saved
        return Promise.resolve(localStorage.getItem(LOCAL_STORAGE_USER_ROLE_KEY));
    }

    return Promise.reject('Unknown method');
};