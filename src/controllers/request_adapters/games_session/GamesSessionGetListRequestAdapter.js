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
import {THERAPIST} from "../../AuthController";
import AuthController from "../../AuthController";

export default class GamesSessionGetListRequestAdapter {
  constructor(paramNameMapper, authController) {
    check.assert.function(paramNameMapper, "paramNameMapper should be a function");
    check.assert.instance(authController, AuthController, "authController should be an instance of AuthController");

    this._paramNameMapper = paramNameMapper;
    this._authController = authController;
  }

  adapt(builder, params) {
    if (this._authController.isUserInRole(THERAPIST)) {
      check.assert.object(params, "params should be an object");
      check.assert.function(builder.listByTherapist, "builder should have a listByTherapist method");

      const therapist = this._authController.getUserName();
      const queryOptions = QueryOptions.fromAORParams(params, this._paramNameMapper);

      return builder.listByTherapist(therapist, queryOptions);
    } else {
      throw new Error("Only therapist can list games sessions");
    }
  }
}
