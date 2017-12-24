import check from "check-types";
import {isUserInRole} from "../../AuthController";
import {THERAPIST} from "../../PermissionsController";

export default class AssignedSessionUpdateRequestAdapter {
  constructor(paramsToIdAndDataMapper) {
    check.assert.function(paramsToIdAndDataMapper, "paramsToIdAndDataMapper should be a function");

    this._paramsToIdAndDataMapper = paramsToIdAndDataMapper;
  }

  adapt(builder, params) {
    if (isUserInRole(THERAPIST)) {
      check.assert.function(builder.update, "builder should have a update method");

      const {id, data} = this._paramsToIdAndDataMapper(params);
      delete data.patient;

      return builder.update(id, data, data);
    } else {
      throw new Error("Only therapist can update assigned games sessions");
    }
  }
}