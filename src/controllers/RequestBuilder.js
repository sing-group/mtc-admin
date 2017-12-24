import check from "check-types";

export default class RequestBuilder {
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

  build(type, resource, params) {
    const endpointFactory = this._getEndpointFactory(resource);

    const actionAdapter = endpointFactory.createRequestAdapter(type);
    const requestBuilder = endpointFactory.createRequestBuilder();

    return actionAdapter.adapt(requestBuilder, params);
  }
}

