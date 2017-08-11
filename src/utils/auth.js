//@flow

import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';
import { AUTH_GET_PERMISSIONS } from 'aor-permissions';

import {GENERAL_ADMIN, CENTER_DIRECTOR, THERAPIST} from './permissions'

import {create} from 'apisauce'

const api = create({
  baseURL: 'http://localhost:4000',
})

export default async (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const { username , password} = params;
        const response = await api.get(`/login?username=${username}&password=${password}`)

        console.log("RESPUESTA", response)
        if (response.status != 200)
            return Promise.reject("common.invalidCredentials")

        localStorage.setItem('username', username);
        localStorage.setItem('permissions', response.data.permission);

        return Promise.resolve({id : response.data.id});
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
    }

    if (type === AUTH_GET_PERMISSIONS) {
        return Promise.resolve(localStorage.getItem('permissions'));
    }

    return Promise.reject('Unknown method');
};