import check from "check-types";
import QueryOptions from "../../../data/endpoints/QueryOptions";
import DefaultGetListRequestAdapter from "../DefaultGetListRequestAdapter";
import {checkLoggedUser} from "../../AuthController";
import {MANAGER} from "../../PermissionsController";

export default class InstitutionGetListRequestAdapter {
  constructor(paramNameMapper) {
    check.assert.function(paramNameMapper, "paramNameMapper should be a function");

    this._paramNameMapper = paramNameMapper;
  }

  adapt(builder, params) {
    check.assert.object(params, "params should be an object");

    const queryOptions = QueryOptions.fromAORParams(params, this._paramNameMapper);
    const manager = checkLoggedUser(MANAGER);

    if (check.assigned(manager)) {
      check.assert.function(builder.listByManager, "builder should have a listByManager method");

      return builder.listByManager(manager, queryOptions);
    } else {
      check.assert.function(builder.list, "builder should have a list method");

      return builder.list(queryOptions);
    }
  }
}