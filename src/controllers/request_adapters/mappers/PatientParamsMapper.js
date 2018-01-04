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
import ParamsMapper from "../ParamsMapper";

export default class PatientParamsMapper extends ParamsMapper {
  convertParamName(paramName) {
    if (paramName === "id") {
      return "login";
    } else {
      return paramName;
    }
  }

  convertParamsToId(params) {
    super._checkId(params);

    return params.id;
  }

  convertParamsToData(params) {
    super._checkParamsData(params);

    check.assert.nonEmptyString(params.data.login, "params.data should have a non empty string login attribute");
    check.assert.nonEmptyString(params.data.password, "params.data should have a non empty string password attribute");
    check.assert.nonEmptyString(params.data.therapist, "params.data should have a non empty string therapist attribute");

    return {
      login: params.data.login,
      password: params.data.password,
      therapist: params.data.therapist
    };
  }

  convertParamsToIdAndData(params) {
    this._checkParamsData(params);

    check.assert.nonEmptyString(params.data.password, "params.data should have a non empty string password attribute");

    return {
      id: params.id,
      data: {
        password: params.data.password
      }
    };
  }
}
