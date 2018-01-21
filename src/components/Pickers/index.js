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

import BooleanParameter from "@sing-group/mtc-games/src/game/metadata/parameter/basic/BooleanParameter";
import IntegerParameter from "@sing-group/mtc-games/src/game/metadata/parameter/basic/IntegerParameter";
import SecondsParameter from "@sing-group/mtc-games/src/game/metadata/parameter/time/SecondsParameter";
import MinutesParameter from "@sing-group/mtc-games/src/game/metadata/parameter/time/MinutesParameter";
import EnumStringParameter from "@sing-group/mtc-games/src/game/metadata/parameter/enum/EnumStringParameter";

import BooleanParameterEditor from "./BooleanParameterEditor";
import IntegerParameterEditor from "./IntegerParameterEditor";
import SecondsParameterEditor from "./SecondsParameterEditor";
import MinutesParameterEditor from "./MinutesParameterEditor";
import EnumStringParameterEditor from "./EnumStringParameterEditor";

export default class GameParameterEditorBuilder {
  static getEditorForParameter(parameter) {
    if (parameter instanceof BooleanParameter) {
      return BooleanParameterEditor;
    } else if (parameter instanceof IntegerParameter) {
      return IntegerParameterEditor;
    } else if (parameter instanceof SecondsParameter) {
      return SecondsParameterEditor;
    } else if (parameter instanceof MinutesParameter) {
      return MinutesParameterEditor;
    } else if (parameter instanceof EnumStringParameter) {
      return EnumStringParameterEditor;
    } else {
      throw new TypeError("Unknown parameter type: " + parameter);
    }
  }

  buildEditorForParameter(parameter, actualValue, onValueChange, key = null) {
    const Editor = GameParameterEditorBuilder.getEditorForParameter(parameter);

    return <Editor
      key={key === null ? parameter.id : key}
      initialValue={parameter.defaultValue}
      value={actualValue}
      onValueChange={(newValue) => onValueChange(parameter.id, newValue)}
      parameter={parameter}
    />;
  }
}

