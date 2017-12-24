import check from "check-types";

export default class DefaultUpdateRequestAdapter {
  constructor(paramsToIdAndDataMapper) {
    check.assert.function(paramsToIdAndDataMapper, "paramsToIdAndDataMapper should be a function");

    this._paramsToIdAndDataMapper = paramsToIdAndDataMapper;
  }

  adapt(builder, params) {
    check.assert.function(builder.update, "builder should have a update method");

    const {id, data} = this._paramsToIdAndDataMapper(params);

    return builder.update(id, data);
  }
}