import { simpleRestClient, fetchUtils, Admin, Resource , fetchJson,jsonServerRestClient,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,} from 'admin-on-rest';
import {LOCAL_STORAGE_USER_CREDENTIALS_KEY} from './auth'

import { stringify } from 'query-string';
import flattenObject from './flattenObject'

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
    return fetchUtils.fetchJson(url, options);
}


/**
 * Maps admin-on-rest queries to a default jsonClient
 */
const defaultJsonRestClient= (apiUrl, httpClient = httpClientDefault) => {
    return jsonServerRestClient(apiUrl, httpClient)
} 


/**
 * Maps admin-on-rest queries to a mtc/rest/api
 */
const customApi = (apiUrl, httpClient = httpClientDefault) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'therapist'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertRESTRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        console.log("PETICION API", type, resource, params)
        switch (type) {
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    ...flattenObject(params.filter),
                    _sort: field,
                    _order: order,
                    _start: (page - 1) * perPage,
                    _end: page * perPage,
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case GET_ONE:
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    ...flattenObject(params.filter),
                    [params.target]: params.id,
                    _sort: field,
                    _order: order,
                    _start: (page - 1) * perPage,
                    _end: page * perPage,
                };
                url = `${apiUrl}/${resource}?${stringify(query)}`;
                break;
            }
            case UPDATE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
                break;
            case CREATE:
                url = `${apiUrl}/${resource}`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = 'DELETE';
                break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    const convertHTTPResponseToREST = (response, type, resource, params) => {
        const { headers, json } = response;

        console.log("Response API", type, resource, params, response)

        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                if (!headers.has('x-total-count')) {
                    throw new Error(
                        'The X-Total-Count header is missing in the HTTP Response. The jsonServer REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
                    );
                }
                return {
                    data: json,
                    total: parseInt(
                        headers
                            .get('x-total-count')
                            .split('/')
                            .pop(),
                        10
                    ),
                };
            case CREATE:
                return { data: { ...params.data, id: json.id } };
            default:
                return { data: json };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return (type, resource, params) => {
        // json-server doesn't handle WHERE IN requests, so we fallback to calling GET_ONE n times instead
        if (type === GET_MANY) {
            return Promise.all(
                params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`))
            ).then(responses => ({
                data: responses.map(response => response.json),
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