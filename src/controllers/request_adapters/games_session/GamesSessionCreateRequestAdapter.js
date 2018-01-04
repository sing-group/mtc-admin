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
import {THERAPIST} from "../../AuthController";
import AuthController from "../../AuthController";

export default class GamesSessionCreateRequestAdapter {
  constructor(paramsToDataMapper, authController) {
    check.assert.function(paramsToDataMapper, "paramsToDataMapper should be a function");
    check.assert.instance(authController, AuthController, "authController should be an instance of AuthController");

    this._paramsToDataMapper = paramsToDataMapper;
    this._authController = authController;
  }

  adapt(builder, params) {
    if (this._authController.isUserInRole(THERAPIST)) {
      check.assert.object(params, "params should be an object");
      check.assert.object(params.data, "params should have an object data attribute");
      check.assert.function(builder.create, "builder should have a create method");

      const therapist = this._authController.getUserName();
      const data = this._paramsToDataMapper(params);

      return builder.create(therapist, data);
    } else {
      throw new Error("Only therapist can create games sessions");
    }
  }
}
