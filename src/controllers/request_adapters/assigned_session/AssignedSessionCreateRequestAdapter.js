import check from "check-types";
import {isUserInRole} from "../../AuthController";
import {THERAPIST} from "../../PermissionsController";

export default class AssignedSessionCreateRequestAdapter {
  constructor(paramsToDataMapper) {
    check.assert.function(paramsToDataMapper, "paramsToDataMapper should be a function");

    this._paramsToDataMapper = paramsToDataMapper;
  }

  adapt(builder, params) {
    if (isUserInRole(THERAPIST)) {
      check.assert.object(params, "params should be an object");
      check.assert.object(params.data, "params should have an object data attribute");
      check.assert.function(builder.create, "builder should have a create method");

      const data = this._paramsToDataMapper(params);
      const patient = data.patient;
      delete data.patient;

      return builder.create(patient, data);
    } else {
      throw new Error("Only therapist can assign games sessions");
    }
  }
}