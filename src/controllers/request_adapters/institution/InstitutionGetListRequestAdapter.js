import check from "check-types";
import QueryOptions from "../../../data/endpoints/QueryOptions";
import {MANAGER} from "../../AuthController";
import AuthController from "../../AuthController";

export default class InstitutionGetListRequestAdapter {
  constructor(paramNameMapper, authController) {
    check.assert.function(paramNameMapper, "paramNameMapper should be a function");
    check.assert.instance(authController, AuthController, "authController should be an instance of AuthController");

    this._paramNameMapper = paramNameMapper;
    this._authController = authController;
  }

  adapt(builder, params) {
    check.assert.object(params, "params should be an object");

    const queryOptions = QueryOptions.fromAORParams(params, this._paramNameMapper);
    const manager = this._authController.checkLoggedUser(MANAGER);

    if (check.assigned(manager)) {
      check.assert.function(builder.listByManager, "builder should have a listByManager method");

      return builder.listByManager(manager, queryOptions);
    } else {
      check.assert.function(builder.list, "builder should have a list method");

      return builder.list(queryOptions);
    }
  }
}