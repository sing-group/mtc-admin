import check from "check-types";
import {THERAPIST} from "../../PermissionsController";
import AuthController from "../../AuthController";

export default class AssignedSessionUpdateRequestAdapter {
  constructor(paramsToIdAndDataMapper, authController) {
    check.assert.function(paramsToIdAndDataMapper, "paramsToIdAndDataMapper should be a function");
    check.assert.instance(authController, AuthController, "authController should be an instance of AuthController");

    this._paramsToIdAndDataMapper = paramsToIdAndDataMapper;
    this._authController = authController;
  }

  adapt(builder, params) {
    if (this._authController.isUserInRole(THERAPIST)) {
      check.assert.function(builder.update, "builder should have a update method");

      const {id, data} = this._paramsToIdAndDataMapper(params);
      delete data.patient;

      return builder.update(id, data, data);
    } else {
      throw new Error("Only therapist can update assigned games sessions");
    }
  }
}