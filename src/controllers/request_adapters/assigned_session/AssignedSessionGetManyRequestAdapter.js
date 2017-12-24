import check from "check-types";
import QueryOptions from "../../../data/endpoints/QueryOptions";

export default class AssignedSessionGetManyRequestAdapter {
  constructor(paramNameMapper) {
    check.assert.function(paramNameMapper, "paramNameMapper should be a function");

    this._paramNameMapper = paramNameMapper;
  }

  adapt(builder, params) {
    check.assert.object(params, "params should be an object");
    check.assert.assigned(params.id, "params should have an id attribute");
    check.assert.assigned(params.target, "params should have a target attribute");

    if (params.target === "patient") {
      check.assert.function(builder.listByPatient, "builder should have a listByPatient method");

      return builder.listByPatient(params.id, QueryOptions.fromAORParams(params));
    } else {
      throw new Error("Unsupported target for GET_MANY_REFERENCE type: " + params.target);
    }
  }
}