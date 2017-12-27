import React from "react";
import pickers from "../../../components/Pickers";

const BooleanParameter = require("@sing-group/mtc-games/src/game/metadata/parameter/basic/BooleanParameter").default;
const IntegerParameter = require("@sing-group/mtc-games/src/game/metadata/parameter/basic/IntegerParameter").default;

const MinutesParameter = require("@sing-group/mtc-games/src/game/metadata/parameter/time/MinutesParameter").default;
const SecondsParameter = require("@sing-group/mtc-games/src/game/metadata/parameter/time/SecondsParameter").default;


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
  InputBuilder
}
