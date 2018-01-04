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

export default class TherapistRequestBuilder {
  constructor(apiUrl) {
    this._requestHelper = new RequestBuilderHelper(apiUrl);
  }

  get(login) {
    check.assert.nonEmptyString(login, "login should be non empty string");

    return this._requestHelper.get(login, "therapist");
  }

  list(queryOptions) {
    check.assert.instance(queryOptions, QueryOptions, "queryOptions should be an instance of QueryOptions");

    return this._requestHelper.list("therapist", queryOptions);
  }

  create(data) {
    check.assert.object(data, "data should be an object");

    return this._requestHelper.create(data, "therapist");
  }

  update(login, data) {
    check.assert.nonEmptyString(login, "login should be non empty string");
    check.assert.object(data, "data should be an object");

    return this._requestHelper.update(login, data, "therapist");
  }

  delete(login) {
    check.assert.nonEmptyString(login, "login should be non empty string");

    return this._requestHelper.delete(login, "therapist");
  }
}
