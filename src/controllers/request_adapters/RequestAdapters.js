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

import DefaultGetAdapter from "./DefaultGetRequestAdapter";
import DefaultListAdapter from "./DefaultGetListRequestAdapter";
import DefaultCreateAdapter from "./DefaultCreateRequestAdapter";
import DefaultUpdateAdapter from "./DefaultUpdateRequestAdapter";
import DefaultDeleteAdapter from "./DefaultDeleteRequestAdapter";
import ParamsMapper from "./ParamsMapper";

export default class RequestAdapters {
  static buildFor(
    paramsMapper,
    additionalAdapters = {}
  ) {
    check.assert.instance(paramsMapper, ParamsMapper, "paramsMapper should be an instance of ParamsMapper");

    const adapters = Object.assign(
      {
        GET_ONE: new DefaultGetAdapter(params => paramsMapper.convertParamsToId(params)),
        GET_LIST: new DefaultListAdapter(paramName => paramsMapper.convertParamName(paramName)),
        CREATE: new DefaultCreateAdapter(params => paramsMapper.convertParamsToData(params)),
        UPDATE: new DefaultUpdateAdapter(params => paramsMapper.convertParamsToIdAndData(params)),
        DELETE: new DefaultDeleteAdapter(params => paramsMapper.convertParamsToId(params))
      },
      additionalAdapters
    );

    return new RequestAdapters(adapters);
  }

  constructor(adapters) {
    Object.assign(this, adapters);
  }
}
