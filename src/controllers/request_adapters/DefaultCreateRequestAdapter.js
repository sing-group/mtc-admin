import check from "check-types";
import QueryOptions from "../../data/endpoints/QueryOptions";

export default class DefaultCreateRequestAdapter {
  constructor(paramsToDataMapper) {
    check.assert.function(paramsToDataMapper, "paramsToDataMapper should be a function");

    this._paramsToDataMapper = paramsToDataMapper;
  }

  adapt(builder, params) {
    check.assert.function(builder.create, "builder should have a create method");
    check.assert.object(params.data, "params should have an object data attribute");

    const data = this._paramsToDataMapper(params);

    return builder.create(data);
  }
}