import check from "check-types";
import ParamsMapper from "../ParamsMapper";

export default class PatientParamsMapper extends ParamsMapper {
  convertParamName(paramName) {
    if (paramName === "id") {
      return "login";
    } else {
      return paramName;
    }
  }

  convertParamsToId(params) {
    super._checkId(params);

    return params.id;
  }

  convertParamsToData(params) {
    super._checkParamsData(params);

    check.assert.nonEmptyString(params.data.login, "params.data should have a non empty string login attribute");
    check.assert.nonEmptyString(params.data.password, "params.data should have a non empty string password attribute");
    check.assert.nonEmptyString(params.data.therapist, "params.data should have a non empty string therapist attribute");

    return {
      login: params.data.login,
      password: params.data.password,
      therapist: params.data.therapist
    };
  }

  convertParamsToIdAndData(params) {
    this._checkParamsData(params);

    check.assert.nonEmptyString(params.data.password, "params.data should have a non empty string password attribute");

    return {
      id: params.id,
      data: {
        password: params.data.password
      }
    };
  }
}