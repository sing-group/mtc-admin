import React from 'react';
import IconButton from 'material-ui/IconButton';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

import * as colors from 'material-ui/styles/colors';

/// PARA USAR CON COLORES
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


