import check from "check-types";
import ParamsMapper from "../ParamsMapper";

export default class ManagerParamsMapper extends ParamsMapper {
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
    check.assert.nonEmptyString(params.data.name, "params.data should have a non empty string name attribute");
    check.assert.nonEmptyString(params.data.surname, "params.data should have a non empty string surname attribute");
    check.assert.nonEmptyString(params.data.email, "params.data should have a non empty string email attribute");
    check.assert.nonEmptyString(params.data.password, "params.data should have a non empty string password attribute");

    return {
      login: params.data.login,
      name: params.data.name,
      surname: params.data.surname,
      email: params.data.email,
      password: params.data.password
    };
  }

  convertParamsToIdAndData(params) {
    this._checkParamsData(params);

    check.assert.nonEmptyString(params.data.id, "params.data should have a non empty string id attribute");
    check.assert.nonEmptyString(params.data.name, "params.data should have a non empty string name attribute");
    check.assert.nonEmptyString(params.data.surname, "params.data should have a non empty string surname attribute");
    check.assert.nonEmptyString(params.data.email, "params.data should have a non empty string email attribute");

    return {
      id: params.id,
      data: {
        name: params.data.name,
        surname: params.data.surname,
        email: params.data.email,
        password: params.data.password
      }
    };
  }
}