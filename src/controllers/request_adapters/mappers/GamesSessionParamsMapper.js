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

export default class GamesSessionParamsMapper extends ParamsMapper {
  convertParamsToId(params) {
    super._checkId(params);

    return parseInt(params.id);
  }

  convertParamsToData(params) {
    super._checkParamsData(params);

    check.assert.object(params.data.name, "params.data should have an object name attribute");
    this._checkKeyParamObject(params.data.name.values);
    check.assert.object(params.data.description, "params.data should have an object description attribute");
    this._checkKeyParamObject(params.data.description.values);
    this._checkGameObjects(params.data.game);

    return {
      game: params.data.game,
      name: params.data.name,
      description: params.data.description
    };
  }

  convertParamsToIdAndData(params) {
    return {
      id: this.convertParamsToId(params),
      data: this.convertParamsToData(params)
    };
  }

  _checkGameObjects(values) {
    check.assert.array(values, "values should be an array");

    const duckType = {
      gameId: "", gameOrder: 0, parameter: []
    };

    values.forEach(game => check.assert.like(game, duckType, "values should contain objects with gameId, gameOrder and parameter attributes"));
    values.forEach(game => this._checkKeyParamObject(game.parameter));
  }

  _checkKeyParamObject(parameters) {
    check.assert.array(parameters, "parameters should be an array");

    parameters.forEach(param => {
      check.assert.nonEmptyString(param.key, "Missing key attribute in: " + param);
      check.assert.assigned(param.value, "Missing value attribute in: " + param);
    });
  }
}
