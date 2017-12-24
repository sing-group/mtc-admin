import check from "check-types";

export default class ResponseDataExtractorHelper {
  constructor(objectBuilder) {
    check.assert.function(objectBuilder, "objectBuilder should be a function");

    this._objectBuilder = objectBuilder;
  }

  extractFromGet(headers, data) {
    return {
      data: this._objectBuilder(data)
    };
  }

  extractFromList(headers, data) {
    check.assert.instanceStrict(headers, Headers, "headers should be an instance of Headers");
    check.assert.array(data, "data should be an array");

    const response = {
      data: data.map(item => this._objectBuilder(item))
    };

    if (headers.has("X-Total-Count")) {
      response.total = parseInt(headers.get("X-Total-Count"));
    } else if (check.nonEmptyArray(data)) {
      response.total = data.length;
    } else {
      throw new Error("Error retrieving total results");
    }

    return response;
  }

  extractFromListBy(headers, data, target, targetId) {
    check.assert.instanceStrict(headers, Headers, "headers should be an instance of Headers");
    check.assert.array(data, "data should be an array");
    check.assert.nonEmptyString(target, "target should be a non empty string");
    check.assert.assigned(targetId, "targetId should have a value");

    const response = {
      data: data.map(item => Object.assign({},
        this._objectBuilder(item),
        {[target]: targetId}
      ))
    };

    if (headers.has("X-Total-Count")) {
      response.total = parseInt(headers.get("X-Total-Count"));
    } else if (check.nonEmptyArray(data)) {
      response.total = data.length;
    } else {
      throw new Error("Error retrieving total results");
    }

    return response;
  }

  extractFromCreate(headers, data, params) {
    check.assert.instanceStrict(headers, Headers, "headers should be an instance of Headers");
    check.assert.object(params, "data should be an object");
    check.assert.object(params.data, "params should have an object data attribute");

    const id = this._extractIdFromLocation(headers.get("Location"));

    return {
      data: Object.assign(
        this._objectBuilder(params.data),
        {id: id}
      )
    };
  }

  extractFromUpdate(headers, data, params) {
    check.assert.instanceStrict(headers, Headers, "headers should be an instance of Headers");
    check.assert.object(params, "data should be an object");
    check.assert.object(params.data, "params should have an object data attribute");

    const id = this._extractIdFromLocation(headers.get("Location"));

    return {
      data: Object.assign(
        this._objectBuilder(params.data),
        {id: id}
      )
    };
  }

  extractFromDelete(headers, data, params) {
    return {
      data: Object.assign(
        this._objectBuilder(params.previousData),
        {id: params.id}
      )
    };
  }

  _extractIdFromLocation(location) {
    check.assert.nonEmptyString(location, "location should be a non empty string");

    const parts = location.split("/");

    return parts[parts.length - 1];
  }
}