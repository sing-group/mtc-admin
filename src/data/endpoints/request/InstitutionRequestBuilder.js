import check from "check-types";

import RequestBuilderHelper from "./RequestBuilderHelper";
import QueryOptions from "../QueryOptions";

export default class InstitutionRequestBuilder {
  constructor(apiUrl) {
    this._requestHelper = new RequestBuilderHelper(apiUrl);
  }

  get(id) {
    check.assert.positive(id, "id should be a positive integer");

    return this._requestHelper.get(id, "institution");
  }

  list(queryOptions) {
    check.assert.instance(queryOptions, QueryOptions, "queryOptions should be an instance of QueryOptions");

    return this._requestHelper.list("institution", queryOptions);
  }

  listByManager(managerLogin, queryOptions) {
    check.assert.nonEmptyString(managerLogin, "managerLogin should be a non empty string");
    check.assert.instance(queryOptions, QueryOptions, "queryOptions should be an instance of QueryOptions");

    const resource = `manager/${RequestBuilderHelper.REFERENCE_ID_TOKEN}/institution`;

    return this._requestHelper.listBy(managerLogin, resource, queryOptions);
  }

  create(data) {
    check.assert.object(data, "data should be an object");

    return this._requestHelper.create(data, "institution");
  }

  update(id, data) {
    check.assert.positive(id, "id should be a positive integer");
    check.assert.object(data, "data should be an object");

    return this._requestHelper.update(id, data, "institution");
  }

  delete(id) {
    check.assert.positive(id, "id should be a positive integer");

    return this._requestHelper.delete(id, "institution");
  }
}