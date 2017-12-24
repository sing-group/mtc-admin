import check from "check-types";

export default class DefaultDeleteRequestAdapter {
  constructor(paramsToIdMapper) {
    check.assert.function(paramsToIdMapper, "paramsToIdMapper should be a function");

    this._paramsToIdMapper = paramsToIdMapper;
  }

  adapt(builder, params) {
    check.assert.function(builder.delete, "builder should have a delete method");

    const id = this._paramsToIdMapper(params);

    return builder.delete(id);
  }
}