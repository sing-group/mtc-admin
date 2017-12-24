import AbstractEndpointFactory from "./AbstractEndpointFactory";
import GamesSessionResponseDataExtractor from "../response/GamesSessionResponseDataExtractor";
import GamesSessionRequestBuilder from "../request/GamesSessionRequestBuilder";

export default class GamesSessionEndpointFactory extends AbstractEndpointFactory {
  constructor(apiUrl, requestAdapters, responseAdapters) {
    super("games-session", apiUrl, requestAdapters, responseAdapters);
  }

  createRequestBuilder() {
    return new GamesSessionRequestBuilder(this._apiUrl);
  }

  createResponseDataExtractor() {
    return new GamesSessionResponseDataExtractor();
  }
}