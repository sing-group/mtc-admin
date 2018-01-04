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
import {MANAGER} from "../../AuthController";
import AuthController from "../../AuthController";

export default class InstitutionGetListResponseAdapter {
  constructor(authController) {
    check.assert.instance(authController, AuthController, "authController should be an instance of AuthController");

    this._authController = authController;
  }

  adapt(extractor, response, params) {
    check.assert.object(response, "response should be an object");
    check.assert.object(params, "params should be an object");

    response.data = response.json;

    if (this._authController.isUserInRole(MANAGER)) {
      check.assert.function(extractor.convertListByManager, "extractor should have a convertListByManager method");

      return extractor.convertListByManager(response, this._authController.getUserName());
    } else {
      check.assert.function(extractor.convertList, "extractor should have a convertList method");

      return extractor.convertList(response, params);
    }
  }
}
