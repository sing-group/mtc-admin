import check from "check-types";

export default class DefaultGetRequestAdapter {
  constructor(paramsToIdMapper) {
    check.assert.function(paramsToIdMapper, "paramsToIdMapper should be a function");

    this._paramsToIdMapper = paramsToIdMapper;
  }

  adapt(builder, params) {
    check.assert.function(builder.get, "builder should have a get method");

    const id = this._paramsToIdMapper(params);

    return builder.get(id);
  }
}