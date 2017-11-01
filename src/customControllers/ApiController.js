import { simpleRestClient, fetchUtils, Admin, Resource , fetchJson, jsonServerRestClient,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,} from 'admin-on-rest';
import {LOCAL_STORAGE_USER_CREDENTIALS_KEY} from './AuthController'


import {getHandlers} from '../data/Endpoints'
import {API_URL} from '../config'
import {stringify} from 'query-string'

/**
 * Custom httpClient
 * 
 * Allow configurate the requests
 * 
 */
const httpClientDefault = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // adding headers
    options.headers.set('Authorization', 'Basic ' + localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_KEY));
    options.headers.set('Access-Control-Alow-Origin', '*')
    options.headers.set('Access-Control-Request-Headers', 'X-Total-Count')
    return fetchUtils.fetchJson(url, options);
}


/**
 * Maps admin-on-rest queries to a default jsonClient
 */
const defaultJsonRestClient= (apiUrl = API_URL, httpClient = httpClientDefault) => {
    return jsonServerRestClient(apiUrl, httpClient)
} 


/**
 * Maps admin-on-rest queries to a mtc/rest/api
 */
const customApi = (apiUrl = API_URL, httpClient = httpClientDefault) => {

    const Endpoints = getHandlers(apiUrl)
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'therapist'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertRESTRequestToHTTP = (type, resource, params) => {
        return (
            Endpoints[resource] && Endpoints[resource][type](params) 
            || 
            Endpoints["default"][type](params, resource) 
        );
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    const convertHTTPResponseToREST = (response, type, resource, params) => {
        return (
            Endpoints[resource] ? 
                Endpoints[resource]["RESPONSE_"+type] && Endpoints[resource]["RESPONSE_"+type](response,params) 
                || 
                Endpoints[resource]["RESPONSE"](response,params) 
             :
                Endpoints["default"]["RESPONSE_"+type] && Endpoints["default"]["RESPONSE_"+type](response,params,resource) 
                || 
                Endpoints["default"]["RESPONSE"](response,params, resource)
        );
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return (type, resource, params) => {
        console.log("API HANDLING",type, resource, params)
        // For support where in request call mny times a GET_ONE
        if (type === GET_MANY) {
            return Promise.all(
                params.ids.map(id => {
                    const { url, options } = convertRESTRequestToHTTP(
                        'GET_ONE',
                        resource,
                        { id }
                    )
                   return httpClient(url, options)
                })
            ).then(responses => ({
                data: responses.map(response => {
                    const toret = convertHTTPResponseToREST(response, 'GET_ONE', resource, {  })
                    return toret.data
                }),
            }));
        }
        const { url, options } = convertRESTRequestToHTTP(
            type,
            resource,
            params
        );
        return httpClient(url, options).then(response =>
            convertHTTPResponseToREST(response, type, resource, params)
        );
    };
};

//exports de client API to use
export default customApi

