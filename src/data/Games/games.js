

//import RECOGNITION from "@sing-group/mtc-games/lib/game/recognition/RecognitionGameMetadata"
//import VERBAL_FLUENCY from "@sing-group/mtc-games/lib/game/verbal_fluency/VerbalFluencyGameMetadata"

const RecognitionMetadata = require("@sing-group/mtc-games/src/game/recognition/RecognitionGameMetadata").default
const VerbalFluencyMetadata = require("@sing-group/mtc-games/src/game/verbal_fluency/VerbalFluencyGameMetadata").default

const games = {
    RECOGNITION: {
        metadata: new RecognitionMetadata()
    },
    VERBAL_FLUENCY: {
        metadata: new VerbalFluencyMetadata()
    }
}

console.log("JUEGOS", games)
function gameBuilder(key, aditionalProps){
    console.log("CONTRUYENDO", key)
    const parametersValues = {

    }

    games[key].metadata.parameters.forEach ( param => {
        parametersValues[param.id] = param.defaultValue
    })
    const game = {
        ...aditionalProps,
        id : games[key].metadata.id,
        nameId : games[key].metadata.nameId,
        parameters: games[key].metadata.parameters,
        parametersValues,
        tasks : games[key].metadata.taskTypes,
        valid: true,
    }
    
    console.log("CONSTRUIDO", game)
    return game
}

export { games, gameBuilder }




