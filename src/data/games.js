

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

function gameBuilder(key, aditionalProps){
    console.log("CONTRUYENDO", key)
    const game = {
        ...aditionalProps,
        id : games[key].metadata.nameId,
        tasks : games[key].metadata.taskTypes
    }
    
    console.log("CONSTRUIDO", game)
    return game
}

export { games, gameBuilder }




