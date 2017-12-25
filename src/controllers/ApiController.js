import check from "check-types";

import {fetchUtils, GET_MANY} from "admin-on-rest";

import RequestBuilder from "./RequestBuilder";
import ResponseDataExtractor from "./ResponseDataExtractor";
import AuthController from "./AuthController";

const defaultHttpClient = function(url, credentials, options = {}) {
  check.assert.nonEmptyString(url, "url should be a non empty string");
  check.assert.object(options, "options should be an object");

  const headers = new Headers({
    "Accept": "application/json",
    "Authorization": "Basic " + credentials,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Request-Headers": "X-Total-Count"
  });

  if (check.instance(options.headers, Headers)) {
    for (let header of options.headers.entries()) {
      headers.set(header[0], header[1]);
    }
  }

  return fetchUtils.fetchJson(
    url,
    Object.assign({}, options, {headers: headers})
  );
};

export default class ApiController {
  constructor(endpointFactories, authController, httpClient = defaultHttpClient) {
    check.assert.instance(authController, AuthController, "authController should be an instance of AuthController");
    check.assert.object(endpointFactories, "endpointFactories should be an object");
    check.assert.function(httpClient, "httpClient should be a function");

    this._authController = authController;
    this._requestBuilder = new RequestBuilder(endpointFactories);
    this._responseDataExtractor = new ResponseDataExtractor(endpointFactories);

    this._httpClient = httpClient;
  }

  _getUserCredentials() {
    return this._authController.getUserCredentials();
  }

  manageRequest(type, resource, params) {
    try {
      if (type === GET_MANY) {
        return Promise.all(
          params.ids.map(id => {
            const {url, options} = this._requestBuilder.build("GET_ONE", resource, {id});

            return this._httpClient(url, this._getUserCredentials(), options);
          })
        ).then(responses => ({
          data: responses.map(response => {
            const restResponse = this._responseDataExtractor.extract(response, "GET_ONE", resource, {});

            return restResponse.data;
          })
        }));
      } else {
        const {url, options} = this._requestBuilder.build(type, resource, params);

        return this._httpClient(url, this._getUserCredentials(), options)
          .then(response =>
            this._responseDataExtractor.extract(response, type, resource, params)
          );
      }
    } catch (e) {
      console.log(e.stack);
      throw e;
    }
  }
}