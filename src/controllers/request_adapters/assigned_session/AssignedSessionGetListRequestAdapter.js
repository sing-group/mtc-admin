import check from "check-types";
import QueryOptions from "../../../data/endpoints/QueryOptions";

export default class AssignedSessionGetListRequestAdapter {
  constructor(paramNameMapper) {
    check.assert.function(paramNameMapper, "paramNameMapper should be a function");

    this._paramNameMapper = paramNameMapper;
  }

  adapt(builder, params) {
    check.assert.object(params, "params should be an object");

    if (isNaN(params.pagination.page))
      params.pagination.page = 1;

    if (check.nonEmptyString(params.filter.patient)) {
      check.assert.function(builder.listByPatient, "builder should have a listByPatient method");

      return builder.listByPatient(params.filter.patient, QueryOptions.fromAORParams(params, this._paramNameMapper));
    } else {
      check.assert.function(builder.list, "builder should have a list method");

      return builder.list(QueryOptions.fromAORParams(params, this._paramNameMapper));
    }
  }
}