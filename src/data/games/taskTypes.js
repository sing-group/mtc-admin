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
import IconButton from "material-ui/IconButton";

import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";

import * as colors from "material-ui/styles/colors";

const taskTypes =
  {
    "game.task.freeMemory":
      {"color": colors.indigo300, "subColor": colors.indigo900},
    "game.task.recognition":
      {"color": colors.blue300, "subColor": colors.blue900},
    "game.task.playbackHearing":
      {"color": colors.purple300, "subColor": colors.purple900},
    "game.task.verbalFluency":
      {"color": colors.orange300, "subColor": colors.orange900},
    "game.task.attentionalSpan":
      {"color": colors.cyan300, "subColor": colors.cyan900},
    "game.task.centralExecutive":
      {"color": colors.green300, "subColor": colors.green900},
    "game.task.calculus":
      {"color": colors.amber300, "subColor": colors.amber900},
    "game.task.associatedPairs":
      {"color": colors.deepPurple300, "subColor": colors.deepPurple900},
  };

export {taskTypes};

//// ------

export function buildIconTooltiped(style, taskElement, number, tooltip) {
  return (
    <IconButton key={taskElement + "Icon"} style={{paddingLeft: 10, paddingRight: 0}} tooltip={tooltip}>
      <Avatar key={taskElement} style={style} size={25} color={taskTypes[taskElement].subColor}
              backgroundColor={taskTypes[taskElement].color}> {number} </Avatar>
    </IconButton>
  );
}

export function buildIcon(style, taskElement, message = "") {
  return <Chip key={taskElement + "chip"} style={style} color={taskTypes[taskElement].subColor}
               backgroundColor={taskTypes[taskElement].color}>{message}</Chip>;
}


