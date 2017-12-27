import check from "check-types";

import QueryOptions from "../QueryOptions";

export default class RequestBuilderHelper {
  static get REFERENCE_ID_TOKEN() {
    return "[REFERENCE_ID]";
  }

  constructor(apiUrl) {
    check.assert.nonEmptyString(apiUrl, "apiUrl should be a valid URL");

    this._apiUrl = apiUrl;
  }

  get(id, resource) {
    check.assert.assigned(id, "id should be assigned");
    check.assert.nonEmptyString(resource, "resource should be a non empty string");

    const url = `${this._apiUrl}/${resource}/${id}`;

    return {url: url, options: {method: "GET"}};
  }

  list(resource, queryOptions = new QueryOptions()) {
    check.assert.nonEmptyString(resource, "resource should be a non empty string");
    check.assert.instance(queryOptions, QueryOptions, "queryOptions should be an instance of QueryOptions");

    const url = queryOptions.appendTo(`${this._apiUrl}/${resource}`);

    return {url: url, options: {method: "GET"}};
  }

  listBy(id, resource, queryOptions = new QueryOptions()) {
    const referenceId = RequestBuilderHelper.REFERENCE_ID_TOKEN;

    check.assert.assigned(id, "id should be assigned");
    check.assert.contains(resource, referenceId, "resource should contain the reference id token: " + referenceId);
    check.assert.instance(queryOptions, QueryOptions, "queryOptions should be an instance of QueryOptions");

    const resourceWithId = resource.replace(referenceId, id);

    const url = queryOptions.appendTo(`${this._apiUrl}/${resourceWithId}`);

    return {url: url, options: {method: "GET"}};
  }

  create(data, resource) {
    check.assert.nonEmptyObject(data, "data should be a non empty object");
    check.assert.nonEmptyString(resource, "resource should be a non empty string");

    const url = `${this._apiUrl}/${resource}`;

    return {
      url: url,
      options: {
        method: "POST",
        body: JSON.stringify(data)
      }
    };
  }

  update(id, data, resource) {
    check.assert.assigned(id, "id should be assigned");
    check.assert.nonEmptyObject(data, "data should be a non empty object");
    check.assert.nonEmptyString(resource, "resource should be a non empty string");

    const url = `${this._apiUrl}/${resource}/${id}`;

    return {
      url: url,
      options: {
        method: "PUT",
        body: JSON.stringify(data)
      }
    };
  }

  delete(id, resource) {
    check.assert.assigned(id, "id should be assigned");
    check.assert.nonEmptyString(resource, "resource should be a non empty string");

    const url = `${this._apiUrl}/${resource}/${id}`;

    return {url: url, options: {method: "DELETE"}};
  }
}