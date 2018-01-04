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

import RequestBuilderHelper from "./RequestBuilderHelper";
import QueryOptions from "../QueryOptions";

export default class AssignedGamesSessionRequestBuilder {
  constructor(apiUrl) {
    this._requestHelper = new RequestBuilderHelper(apiUrl);
  }

  get(id) {
    check.assert.positive(id, "id should be a positive integer");

    return this._requestHelper.get(id, "games-session/assigned");
  }

  list(queryOptions) {
    check.assert.instance(queryOptions, QueryOptions, "queryOptions should be an instance of QueryOptions");

    return this._requestHelper.list("games-session/assigned", queryOptions);
  }

  listByPatient(patient, queryOptions) {
    check.assert.nonEmptyString(patient, "patient should be a non empty string");
    check.assert.instance(queryOptions, QueryOptions, "queryOptions should be an instance of QueryOptions");

    const resource = `patient/${RequestBuilderHelper.REFERENCE_ID_TOKEN}/games-session/assigned`;

    return this._requestHelper.listBy(patient, resource, queryOptions);
  }

  create(patient, data) {
    check.assert.object(data, "data should be an object");

    const resource = `patient/${patient}/games-session/assigned`;

    return this._requestHelper.create(data, resource);
  }

  update(id, data) {
    check.assert.positive(id, "id should be a positive integer");
    check.assert.object(data, "data should be an object");

    return this._requestHelper.update(id, data, "games-session/assigned");
  }

  delete(id) {
    check.assert.positive(id, "id should be a positive integer");

    return this._requestHelper.delete(id, "games-session/assigned");
  }
}
