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

export default class AssignedGamesSessionParamsMapper extends ParamsMapper {
  convertParamsToId(params) {
    super._checkId(params);

    return parseInt(params.id);
  }

  convertParamsToData(params) {
    super._checkParamsData(params);

    check.assert.nonEmptyString(params.data.patient, "params.data should have a non empty string patient attribute");
    check.assert.positive(params.data.assignedGamesSessions, "params.data should have a positive integer assignedGamesSessions attribute");
    this._checkDate(params.data.startDate, "params.data should have a non empty string startDate attribute");
    this._checkDate(params.data.endDate, "params.data should have a non empty string endDate attribute");

    return {
      patient: params.data.patient,
      gamesSessionId: params.data.assignedGamesSessions,
      startDate: this._dateToTimestamp(params.data.startDate),
      endDate: this._dateToTimestamp(params.data.endDate)
    };
  }

  convertParamsToIdAndData(params) {
    super._checkParamsData(params);
    this._checkDate(params.data.startDate, "params.data should have a non empty string startDate attribute");
    this._checkDate(params.data.endDate, "params.data should have a non empty string endDate attribute");

    return {
      id: this.convertParamsToId(params),
      data: {
        startDate: this._dateToTimestamp(params.data.startDate),
        endDate: this._dateToTimestamp(params.data.endDate)
      }
    };
  }

  _checkDate(date, message) {
    if (!check.nonEmptyString(date) && !check.positive(date)) {
      throw new Error(message);
    }
  }

  _dateToTimestamp(date) {
    if (check.positive(date)) {
      return date;
    } else {
      return new Date(date).getTime();
    }
  }
}
