import ManagerRequestBuilder from "../request/ManagerRequestBuilder";
import ManagerResponseDataExtractor from "../response/ManagerResponseDataExtractor";
import AbstractEndpointFactory from "./AbstractEndpointFactory";

export default class ManagerEndpointFactory extends AbstractEndpointFactory {
  constructor(apiUrl, requestAdapters, responseAdapters) {
    super("manager", apiUrl, requestAdapters, responseAdapters);
  }

  createRequestBuilder() {
    return new ManagerRequestBuilder(this._apiUrl);
  }

  createResponseDataExtractor() {
    return new ManagerResponseDataExtractor();
  }
}