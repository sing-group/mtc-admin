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
import React from "react";
import pickers from "../../../components/Pickers";

const BooleanParameter = require("@sing-group/mtc-games/src/game/metadata/parameter/basic/BooleanParameter").default;
const IntegerParameter = require("@sing-group/mtc-games/src/game/metadata/parameter/basic/IntegerParameter").default;

const MinutesParameter = require("@sing-group/mtc-games/src/game/metadata/parameter/time/MinutesParameter").default;
const SecondsParameter = require("@sing-group/mtc-games/src/game/metadata/parameter/time/SecondsParameter").default;

const EnumStringParameter = require("@sing-group/mtc-games/src/game/metadata/parameter/enum/EnumStringParameter").default;


const InputBuilder = (actualValue, parameter, valueModificationFunction, initialValue) => {
  const Component = pickers[parameter.constructor.name];

  return <Component key={parameter.id}
                    initialValue={initialValue}
                    value={actualValue}
                    onValueChange={(newValue) => valueModificationFunction(parameter.id, newValue)}
                    parameter={parameter}
         />;
};

export {
  BooleanParameter,
  IntegerParameter,
  MinutesParameter,
  SecondsParameter,
  EnumStringParameter,
  InputBuilder
}
