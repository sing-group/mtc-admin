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

export default class ResponseDataExtractorHelper {
  constructor(objectBuilder) {
    check.assert.function(objectBuilder, "objectBuilder should be a function");

    this._objectBuilder = objectBuilder;
  }

  extractFromGet(headers, data) {
    return {
      data: this._objectBuilder(data)
    };
  }

  extractFromList(headers, data) {
    check.assert.instanceStrict(headers, Headers, "headers should be an instance of Headers");
    check.assert.array(data, "data should be an array");

    const response = {
      data: data.map(item => this._objectBuilder(item))
    };

    if (headers.has("X-Total-Count")) {
      response.total = parseInt(headers.get("X-Total-Count"));
    } else if (check.nonEmptyArray(data)) {
      response.total = data.length;
    } else {
      throw new Error("Error retrieving total results");
    }

    return response;
  }

  extractFromListBy(headers, data, target, targetId) {
    check.assert.instanceStrict(headers, Headers, "headers should be an instance of Headers");
    check.assert.array(data, "data should be an array");
    check.assert.nonEmptyString(target, "target should be a non empty string");
    check.assert.assigned(targetId, "targetId should have a value");

    const response = {
      data: data.map(item => Object.assign({},
        this._objectBuilder(item),
        {[target]: targetId}
      ))
    };

    if (headers.has("X-Total-Count")) {
      response.total = parseInt(headers.get("X-Total-Count"));
    } else if (check.nonEmptyArray(data)) {
      response.total = data.length;
    } else {
      throw new Error("Error retrieving total results");
    }

    return response;
  }

  extractFromCreate(headers, data, params) {
    check.assert.instanceStrict(headers, Headers, "headers should be an instance of Headers");
    check.assert.object(params, "data should be an object");
    check.assert.object(params.data, "params should have an object data attribute");

    const id = this._extractIdFromLocation(headers.get("Location"));

    return {
      data: Object.assign(
        this._objectBuilder(params.data),
        {id: id}
      )
    };
  }

  extractFromUpdate(headers, data, params) {
    check.assert.instanceStrict(headers, Headers, "headers should be an instance of Headers");
    check.assert.object(params, "data should be an object");
    check.assert.object(params.data, "params should have an object data attribute");

    const id = this._extractIdFromLocation(headers.get("Location"));

    return {
      data: Object.assign(
        this._objectBuilder(params.data),
        {id: id}
      )
    };
  }

  extractFromDelete(headers, data, params) {
    return {
      data: Object.assign(
        this._objectBuilder(params.previousData),
        {id: params.id}
      )
    };
  }

  _extractIdFromLocation(location) {
    check.assert.nonEmptyString(location, "location should be a non empty string");

    const parts = location.split("/");

    return parts[parts.length - 1];
  }
}
