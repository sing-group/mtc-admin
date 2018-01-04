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

export default class InstitutionGetManyReferenceRequestAdapter {
  adapt(builder, params) {
    check.assert.object(params, "params should be an object");
    check.assert.assigned(params.id, "params should have an id attribute");
    check.assert.assigned(params.target, "params should have a target attribute");

    if (params.target === "manager") {
      check.assert.function(builder.listByManager, "builder should have a listByManager method");

      return builder.listByManager(params.id, QueryOptions.fromAORParams(params));
    } else {
      throw new Error("Unsupported target for GET_MANY_REFERENCE type: " + params.target);
    }
  }
}
