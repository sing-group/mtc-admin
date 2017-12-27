import check from "check-types";
import {THERAPIST} from "../../AuthController";
import AuthController from "../../AuthController";

export default class GamesSessionCreateRequestAdapter {
  constructor(paramsToDataMapper, authController) {
    check.assert.function(paramsToDataMapper, "paramsToDataMapper should be a function");
    check.assert.instance(authController, AuthController, "authController should be an instance of AuthController");

    this._paramsToDataMapper = paramsToDataMapper;
    this._authController = authController;
  }

  adapt(builder, params) {
    if (this._authController.isUserInRole(THERAPIST)) {
      check.assert.object(params, "params should be an object");
      check.assert.object(params.data, "params should have an object data attribute");
      check.assert.function(builder.create, "builder should have a create method");

      const therapist = this._authController.getUserName();
      const data = this._paramsToDataMapper(params);

      return builder.create(therapist, data);
    } else {
      throw new Error("Only therapist can create games sessions");
    }
  }
}