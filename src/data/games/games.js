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
  'recognition': games.RECOGNITION,
  'verbalFluency': games.VERBAL_FLUENCY
};

function gameBuilder(key, additionalProps) {
  const parametersValues = {};

  games[key].metadata.parameters.forEach(param => {
    parametersValues[param.id] = param.defaultValue
  });

  return {
    ...additionalProps,
    id: games[key].metadata.id,
    nameId: games[key].metadata.nameId,
    parameters: games[key].metadata.parameters,
    parametersValues,
    tasks: games[key].metadata.taskTypes,
    valid: true,
  };
}

function gameAdapter(game) {
  const key = game.gameId;
  const parametersValues = game.parameter.reduce((p, c) => {
    p[c.key] = c.value;
    return p
  }, {});

  const adapter = {
    id: relation[key].metadata.id,
    nameId: relation[key].metadata.nameId,
    parameters: relation[key].metadata.parameters,
    parametersValues: parametersValues,
    tasks: relation[key].metadata.taskTypes,
    valid: true,
  };

  console.log("ADAPTER:", adapter);

  return adapter;
}

export {games, gameBuilder, gameAdapter};
