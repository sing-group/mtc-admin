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
/* eslint-disable no-unused-vars */
import check from "check-types";

export default class ParamsMapper {
  convertParamName(paramName) {
    return paramName;
  }

  convertParamsToId(params) {
    throw new Error("convertParamsToId method should be implemented by subclasses");
  }

  convertParamsToData(params) {
    throw new Error("convertParamsToData method should be implemented by subclasses");
  }

  convertParamsToIdAndData(params) {
    throw new Error("convertParamsToIdAndData method should be implemented by subclasses");
  }

  _checkId(params) {
    check.assert.object(params, "params should be an object");
    check.assert.assigned(params.id, "params should have an id attribute");
  }

  _checkParamsData(params) {
    check.assert.object(params, "params should be an object");
    check.assert.object(params.data, "params should have an object data attribute");
  }
}
