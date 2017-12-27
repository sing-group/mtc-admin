/* eslint-disable no-unused-vars */
import check from "check-types";

export default class ParamsMapper {
  convertParamName(paramName) {
    return paramName;
  }

  convertParamsToId(params) {
    throw new Error("convertParamsToId method should be implemented by subclasses");
  }

  convertParamsToData(params) {
    throw new Error("convertParamsToData method should be implemented by subclasses");
  }

  convertParamsToIdAndData(params) {
    throw new Error("convertParamsToIdAndData method should be implemented by subclasses");
  }

  _checkId(params) {
    check.assert.object(params, "params should be an object");
    check.assert.assigned(params.id, "params should have an id attribute");
  }

  _checkParamsData(params) {
    check.assert.object(params, "params should be an object");
    check.assert.object(params.data, "params should have an object data attribute");
  }
}