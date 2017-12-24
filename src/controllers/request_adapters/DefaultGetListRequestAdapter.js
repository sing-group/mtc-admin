import check from "check-types";
import QueryOptions from "../../data/endpoints/QueryOptions";

export default class DefaultGetListRequestAdapter {
  constructor(paramNameMapper) {
    check.assert.function(paramNameMapper, "paramNameMapper should be a function");

    this._paramNameMapper = paramNameMapper;
  }

  adapt(builder, params) {
    check.assert.function(builder.list, "builder should have a list method");
    check.assert.object(params, "params should be an object");

    return builder.list(QueryOptions.fromAORParams(params, this._paramNameMapper));
  }
}