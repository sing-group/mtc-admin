import check from "check-types";

export default class AbstractEndpointFactory {
  constructor(resource, apiUrl, requestAdapters, responseAdapters) {
    check.assert.nonEmptyString(resource, "resource should be a non empty string");
    check.assert.nonEmptyString(apiUrl, "apiUrl should be a non empty string");
    check.assert.object(requestAdapters, "requestAdapters should be an object");
    check.assert.object(responseAdapters, "responseAdapters should be an object");

    this._resourceName = resource;
    this._apiUrl = apiUrl;
    this._requestAdapters = requestAdapters;
    this._responseAdapters = responseAdapters;
  }

  createRequestBuilder() {
    throw Error("this method should be implemented in the subclasses");
  }

  createResponseDataExtractor() {
    throw Error("this method should be implemented in the subclasses");
  }

  createRequestAdapter(type) {
    if (check.assigned(this._requestAdapters[type])) {
      return this._requestAdapters[type];
    } else {
      throw Error(`No adapter found in type ${type} for "${this._resourceName}" resource`);
    }
  }

  createResponseAdapter(type) {
    if (check.assigned(this._responseAdapters[type])) {
      return this._responseAdapters[type];
    } else {
      throw Error(`No response adapter found in type ${type} for "${this._resourceName}" resource`);
    }
  }
}