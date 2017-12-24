import check from "check-types";

import RequestBuilderHelper from "./RequestBuilderHelper";
import QueryOptions from "../QueryOptions";

export default class AssignedGamesSessionRequestBuilder {
  constructor(apiUrl) {
    this._requestHelper = new RequestBuilderHelper(apiUrl);
  }

  get(id) {
    check.assert.positive(id, "id should be a positive integer");

    return this._requestHelper.get(id, "games-session/assigned");
  }

  list(queryOptions) {
    check.assert.instance(queryOptions, QueryOptions, "queryOptions should be an instance of QueryOptions");

    return this._requestHelper.list("games-session/assigned", queryOptions);
  }

  listByPatient(patient, queryOptions) {
    check.assert.nonEmptyString(patient, "patient should be a non empty string");
    check.assert.instance(queryOptions, QueryOptions, "queryOptions should be an instance of QueryOptions");

    const resource = `patient/${RequestBuilderHelper.REFERENCE_ID_TOKEN}/games-session/assigned`;

    return this._requestHelper.listBy(patient, resource, queryOptions);
  }

  create(patient, data) {
    check.assert.object(data, "data should be an object");

    const resource = `patient/${patient}/games-session/assigned`;

    return this._requestHelper.create(data, resource);
  }

  update(id, data) {
    check.assert.positive(id, "id should be a positive integer");
    check.assert.object(data, "data should be an object");

    return this._requestHelper.update(id, data, "games-session/assigned");
  }

  delete(id) {
    check.assert.positive(id, "id should be a positive integer");

    return this._requestHelper.delete(id, "games-session/assigned");
  }
}