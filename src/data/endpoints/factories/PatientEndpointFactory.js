import AbstractEndpointFactory from "./AbstractEndpointFactory";
import PatientRequestBuilder from "../request/PatientRequestBuilder";
import PatientResponseDataExtractor from "../response/PatientResponseDataExtractor";

export default class PatientEndpointFactory extends AbstractEndpointFactory {
  constructor(apiUrl, requestAdapters, responseAdapters) {
    super("patient", apiUrl, requestAdapters, responseAdapters);
  }

  createRequestBuilder() {
    return new PatientRequestBuilder(this._apiUrl);
  }

  createResponseDataExtractor() {
    return new PatientResponseDataExtractor();
  }
}