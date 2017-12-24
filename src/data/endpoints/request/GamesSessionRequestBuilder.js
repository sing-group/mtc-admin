import check from "check-types";

import RequestBuilderHelper from "./RequestBuilderHelper";
import QueryOptions from "../QueryOptions";

export default class GamesSessionRequestBuilder {
  constructor(apiUrl) {
    this._requestHelper = new RequestBuilderHelper(apiUrl);
  }

  get(id) {
    check.assert.positive(id, "id should be a positive integer");

    return this._requestHelper.get(id, "games-session");
  }

  listByTherapist(therapist, queryOptions) {
    check.assert.nonEmptyString(therapist, "therapist should be a non empty string");
    check.assert.instance(queryOptions, QueryOptions, "queryOptions should be an instance of QueryOptions");

    const resource = `therapist/${RequestBuilderHelper.REFERENCE_ID_TOKEN}/games-session`;

    return this._requestHelper.listBy(therapist, resource, queryOptions);
  }

  create(therapist, data) {
    check.assert.object(data, "data should be an object");

    const resource = `therapist/${therapist}/games-session`;

    return this._requestHelper.create(data, resource);
  }

  update(id, data) {
    check.assert.positive(id, "id should be a positive integer");
    check.assert.object(data, "data should be an object");

    return this._requestHelper.update(id, data, "games-session");
  }

  delete(id) {
    check.assert.positive(id, "id should be a positive integer");

    return this._requestHelper.delete(id, "games-session");
  }
}