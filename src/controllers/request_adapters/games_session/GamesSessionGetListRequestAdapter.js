import check from "check-types";
import QueryOptions from "../../../data/endpoints/QueryOptions";
import {THERAPIST} from "../../AuthController";
import AuthController from "../../AuthController";

export default class GamesSessionGetListRequestAdapter {
  constructor(paramNameMapper, authController) {
    check.assert.function(paramNameMapper, "paramNameMapper should be a function");
    check.assert.instance(authController, AuthController, "authController should be an instance of AuthController");

    this._paramNameMapper = paramNameMapper;
    this._authController = authController;
  }

  adapt(builder, params) {
    if (this._authController.isUserInRole(THERAPIST)) {
      check.assert.object(params, "params should be an object");
      check.assert.function(builder.listByTherapist, "builder should have a listByTherapist method");

      const therapist = this._authController.getUserName();
      const queryOptions = QueryOptions.fromAORParams(params, this._paramNameMapper);

      return builder.listByTherapist(therapist, queryOptions);
    } else {
      throw new Error("Only therapist can list games sessions");
    }
  }
}