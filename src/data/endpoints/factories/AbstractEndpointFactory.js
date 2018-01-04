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

export default class AbstractEndpointFactory {
  constructor(resource, apiUrl, requestAdapters, responseAdapters) {
    check.assert.nonEmptyString(resource, "resource should be a non empty string");
    check.assert.nonEmptyString(apiUrl, "apiUrl should be a non empty string");
    check.assert.object(requestAdapters, "requestAdapters should be an object");
    check.assert.object(responseAdapters, "responseAdapters should be an object");

    this._resourceName = resource;
    this._apiUrl = apiUrl;
    this._requestAdapters = requestAdapters;
    this._responseAdapters = responseAdapters;
  }

  createRequestBuilder() {
    throw Error("this method should be implemented in the subclasses");
  }

  createResponseDataExtractor() {
    throw Error("this method should be implemented in the subclasses");
  }

  createRequestAdapter(type) {
    if (check.assigned(this._requestAdapters[type])) {
      return this._requestAdapters[type];
    } else {
      throw Error(`No adapter found in type ${type} for "${this._resourceName}" resource`);
    }
  }

  createResponseAdapter(type) {
    if (check.assigned(this._responseAdapters[type])) {
      return this._responseAdapters[type];
    } else {
      throw Error(`No response adapter found in type ${type} for "${this._resourceName}" resource`);
    }
  }
}
