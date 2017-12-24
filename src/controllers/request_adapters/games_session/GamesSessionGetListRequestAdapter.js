import check from "check-types";
import QueryOptions from "../../../data/endpoints/QueryOptions";
import {getUserName, isUserInRole} from "../../AuthController";
import {THERAPIST} from "../../PermissionsController";

export default class GamesSessionGetListRequestAdapter {
  constructor(paramNameMapper) {
    check.assert.function(paramNameMapper, "paramNameMapper should be a function");

    this._paramNameMapper = paramNameMapper;
  }

  adapt(builder, params) {
    if (isUserInRole(THERAPIST)) {
      check.assert.object(params, "params should be an object");
      check.assert.function(builder.listByTherapist, "builder should have a listByTherapist method");

      const therapist = getUserName();
      const queryOptions = QueryOptions.fromAORParams(params, this._paramNameMapper);

      return builder.listByTherapist(therapist, queryOptions);
    } else {
      throw new Error("Only therapist can list games sessions");
    }
  }
}