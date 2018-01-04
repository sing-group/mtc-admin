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
//import RECOGNITION from "@sing-group/mtc-games/lib/game/recognition/RecognitionGameMetadata"
//import VERBAL_FLUENCY from "@sing-group/mtc-games/lib/game/verbal_fluency/VerbalFluencyGameMetadata"

const RecognitionMetadata = require("@sing-group/mtc-games/src/game/recognition/RecognitionGameMetadata").default;
const VerbalFluencyMetadata = require("@sing-group/mtc-games/src/game/verbal_fluency/VerbalFluencyGameMetadata").default;

const games = {
  RECOGNITION: {
    metadata: new RecognitionMetadata()
  },
  VERBAL_FLUENCY: {
    metadata: new VerbalFluencyMetadata()
  }
};

const relation = {
  recognition: games.RECOGNITION,
  verbalFluency: games.VERBAL_FLUENCY
};

function gameBuilder(key, additionalProps) {
  const parametersValues = {};

  games[key].metadata.parameters.forEach(param => {
    parametersValues[param.id] = param.defaultValue
  });

  return Object.assign({}, additionalProps,
    {
      id: games[key].metadata.id,
      nameId: games[key].metadata.nameId,
      parameters: games[key].metadata.parameters,
      parametersValues,
      tasks: games[key].metadata.taskTypes,
      valid: true,
    }
  );
}

function gameAdapter(game) {
  const key = game.gameId;
  const parametersValues = game.parameter.reduce((p, c) => {
    p[c.key] = c.value;
    return p
  }, {});

  return {
    id: relation[key].metadata.id,
    nameId: relation[key].metadata.nameId,
    parameters: relation[key].metadata.parameters,
    parametersValues: parametersValues,
    tasks: relation[key].metadata.taskTypes,
    valid: true
  };
}

export {games, gameBuilder, gameAdapter};
