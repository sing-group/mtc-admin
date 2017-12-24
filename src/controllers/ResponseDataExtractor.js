import check from "check-types";

export default class ResponseDataExtractor {
  constructor(endpointFactories) {
    this._endpointFactories = endpointFactories;
  }

  _canManageResource(resource) {
    return check.assigned(resource);
  }

  _getEndpointFactory(resource) {
    if (this._canManageResource(resource)) {
      return this._endpointFactories[resource];
    } else {
      throw new Error(`No endpoint factory found for resource ${resource}`);
    }
  }

  extract(response, type, resource, params) {
    const endpointFactory = this._getEndpointFactory(resource);

    const responseAdapter = endpointFactory.createResponseAdapter(type);
    const responseDataExtractor = endpointFactory.createResponseDataExtractor();

    return responseAdapter.adapt(responseDataExtractor, response, params);
  }
}