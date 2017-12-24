import AbstractEndpointFactory from "./AbstractEndpointFactory";
import AssignedGamesSessionRequestBuilder from "../request/AssignedGamesSessionRequestBuilder";
import AssignedGamesSessionResponseDataExtractor from "../response/AssignedGamesSessionResponseDataExtractor";

export default class AssignedGamesSessionEndpointFactory extends AbstractEndpointFactory {
  constructor(apiUrl, requestAdapters, responseAdapters) {
    super("assigned-session", apiUrl, requestAdapters, responseAdapters);
  }

  createRequestBuilder() {
    return new AssignedGamesSessionRequestBuilder(this._apiUrl);
  }

  createResponseDataExtractor() {
    return new AssignedGamesSessionResponseDataExtractor();
  }
}