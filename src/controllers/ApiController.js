import {fetchUtils, GET_MANY} from 'admin-on-rest';

import {LOCAL_STORAGE_USER_CREDENTIALS_KEY} from './AuthController';

import {getHandlers} from '../data/endpoints';
import {API_URL} from '../config';

/**
 * Custom httpClient
 *
 * Allow configurating the requests
 *
 */
const httpClientDefault = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({Accept: 'application/json'});
  }

  // adding headers
  options.headers.set('Authorization', 'Basic ' + localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_KEY));
  options.headers.set('Access-Control-Allow-Origin', '*');
  options.headers.set('Access-Control-Request-Headers', 'X-Total-Count');

  return fetchUtils.fetchJson(url, options);
};

/**
 * Maps admin-on-rest queries to a mtc/rest/api
 */
const customApi = (apiUrl = API_URL, httpClient = httpClientDefault) => {
  const Endpoints = getHandlers(apiUrl);

  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'therapist'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertRESTRequestToHTTP = (type, resource, params) => {
    if (Endpoints[resource]) {
      return Endpoints[resource][type](params);
    } else {
      return Endpoints['default'][type](params, resource);
    }
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} REST response
   */
  const convertHTTPResponseToREST = (response, type, resource, params) => {
    if (Endpoints[resource]) {
      if (Endpoints[resource]["RESPONSE_" + type]) {
        return Endpoints[resource]["RESPONSE_" + type](response, params);
      } else {
        return Endpoints[resource]["RESPONSE"](response, params);
      }
    } else {
      if (Endpoints["default"]["RESPONSE_" + type]) {
        return Endpoints["default"]["RESPONSE_" + type](response, params, resource);
      } else {
        return Endpoints["default"]["RESPONSE"](response, params, resource);
      }
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a REST response
   */
  return (type, resource, params) => {
    // For support where in request call many times a GET_ONE
    if (type === GET_MANY) {
      return Promise.all(
        params.ids.map(id => {
          const {url, options} = convertRESTRequestToHTTP('GET_ONE', resource, {id});

          return httpClient(url, options);
        })
      ).then(responses => ({
        data: responses.map(response => {
          const restResponse = convertHTTPResponseToREST(response, 'GET_ONE', resource, {});

          return restResponse.data;
        })
      }));
    } else {
      const {url, options} = convertRESTRequestToHTTP(type, resource, params);

      return httpClient(url, options).then(response =>
        convertHTTPResponseToREST(response, type, resource, params)
      );
    }
  };
};

//exports de client API to use
export default customApi;

