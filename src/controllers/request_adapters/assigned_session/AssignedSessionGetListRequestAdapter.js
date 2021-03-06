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
import QueryOptions from "../../../data/endpoints/QueryOptions";

export default class AssignedSessionGetListRequestAdapter {
  constructor(paramNameMapper) {
    check.assert.function(paramNameMapper, "paramNameMapper should be a function");

    this._paramNameMapper = paramNameMapper;
  }

  adapt(builder, params) {
    check.assert.object(params, "params should be an object");

    if (isNaN(params.pagination.page))
      params.pagination.page = 1;

    if (check.nonEmptyString(params.filter.patient)) {
      check.assert.function(builder.listByPatient, "builder should have a listByPatient method");

      return builder.listByPatient(params.filter.patient, QueryOptions.fromAORParams(params, this._paramNameMapper));
    } else {
      check.assert.function(builder.list, "builder should have a list method");

      return builder.list(QueryOptions.fromAORParams(params, this._paramNameMapper));
    }
  }
}
