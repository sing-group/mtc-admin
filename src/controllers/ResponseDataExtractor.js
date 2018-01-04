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

export default class ResponseDataExtractor {
  constructor(endpointFactories) {
    this._endpointFactories = endpointFactories;
  }

  _canManageResource(resource) {
    return check.assigned(resource);
  }

  _getEndpointFactory(resource) {
    if (this._canManageResource(resource)) {
      return this._endpointFactories[resource];
    } else {
      throw new Error(`No endpoint factory found for resource ${resource}`);
    }
  }

  extract(response, type, resource, params) {
    const endpointFactory = this._getEndpointFactory(resource);

    const responseAdapter = endpointFactory.createResponseAdapter(type);
    const responseDataExtractor = endpointFactory.createResponseDataExtractor();

    return responseAdapter.adapt(responseDataExtractor, response, params);
  }
}
