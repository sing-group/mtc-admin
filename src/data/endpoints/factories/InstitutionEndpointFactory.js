import InstitutionRequestBuilder from "../request/InstitutionRequestBuilder";
import InstitutionResponseDataExtractor from "../response/InstitutionResponseDataExtractor";
import AbstractEndpointFactory from "./AbstractEndpointFactory";

export default class InstitutionEndpointFactory extends AbstractEndpointFactory {
  constructor(apiUrl, requestAdapters, responseAdapters) {
    super("institution", apiUrl, requestAdapters, responseAdapters);
  }

  createRequestBuilder() {
    return new InstitutionRequestBuilder(this._apiUrl);
  }

  createResponseDataExtractor() {
    return new InstitutionResponseDataExtractor();
  }
}