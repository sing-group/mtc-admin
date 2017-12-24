import check from "check-types";
import ParamsMapper from "../ParamsMapper";

export default class InstitutionParamsMapper extends ParamsMapper {
  convertParamsToId(params) {
    super._checkId(params);

    return parseInt(params.id);
  }

  convertParamsToData(params) {
    super._checkParamsData(params);

    check.assert.nonEmptyString(params.data.name, "params.data should have a non empty string name attribute");
    check.assert.nonEmptyString(params.data.description, "params.data should have a non empty string description attribute");
    check.assert.nonEmptyString(params.data.address, "params.data should have a non empty string address attribute");
    check.assert.nonEmptyString(params.data.manager, "params.data should have a non empty string manager attribute");

    return {
      name: params.data.name,
      description: params.data.description,
      address: params.data.address,
      manager: params.data.manager
    };
  }

  convertParamsToIdAndData(params) {
    const id = this.convertParamsToId(params);
    const data = this.convertParamsToData(params)

    return {
      id: id,
      data: data
    };
  }
}