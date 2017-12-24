import AbstractEndpointFactory from "./AbstractEndpointFactory";
import TherapistRequestBuilder from "../request/TherapistRequestBuilder";
import TherapistResponseDataExtractor from "../response/TherapistResponseDataExtractor";

export default class TherapistEndpointFactory extends AbstractEndpointFactory {
  constructor(apiUrl, requestAdapters, responseAdapters) {
    super("therapist", apiUrl, requestAdapters, responseAdapters);
  }

  createRequestBuilder() {
    return new TherapistRequestBuilder(this._apiUrl);
  }

  createResponseDataExtractor() {
    return new TherapistResponseDataExtractor();
  }
}