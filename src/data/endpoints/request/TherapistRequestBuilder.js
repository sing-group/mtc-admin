import check from "check-types";

import RequestBuilderHelper from "./RequestBuilderHelper";
import QueryOptions from "../QueryOptions";

export default class TherapistRequestBuilder {
  constructor(apiUrl) {
    this._requestHelper = new RequestBuilderHelper(apiUrl);
  }

  get(login) {
    check.assert.nonEmptyString(login, "login should be non empty string");

    return this._requestHelper.get(login, "therapist");
  }

  list(queryOptions) {
    check.assert.instance(queryOptions, QueryOptions, "queryOptions should be an instance of QueryOptions");

    return this._requestHelper.list("therapist", queryOptions);
  }

  create(data) {
    check.assert.object(data, "data should be an object");

    return this._requestHelper.create(data, "therapist");
  }

  update(login, data) {
    check.assert.nonEmptyString(login, "login should be non empty string");
    check.assert.object(data, "data should be an object");

    return this._requestHelper.update(login, data, "therapist");
  }

  delete(login) {
    check.assert.nonEmptyString(login, "login should be non empty string");

    return this._requestHelper.delete(login, "therapist");
  }
}