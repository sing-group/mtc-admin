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
      /*eslint no-console: ["error", { allow: ["error"] }] */
      console.error(e.stack);
      throw e;
    }
  }
}
