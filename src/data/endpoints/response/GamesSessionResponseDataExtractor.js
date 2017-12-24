import ResponseDataExtractorHelper from "./ResponseDataExtractorHelper";

export default class GamesSessionResponseDataExtractor {
  constructor() {
    this._helper = new ResponseDataExtractorHelper(data => {
      const plainNameLocales = {};
      data.name.values && data.name.values.forEach(n => plainNameLocales["name" + n.key] = n.value);

      return Object.assign({}, data, plainNameLocales);
    });
  }

  convertGet(response) {
    return this._helper.extractFromGet(response.headers, response.data);
  }

  convertList(response) {
    return this._helper.extractFromList(response.headers, response.data);
  }

  convertCreate(response, params) {
    return this._helper.extractFromCreate(response.headers, response.data, params);
  }

  convertUpdate(response, params) {
    return this._helper.extractFromUpdate(response.headers, response.data, params);
  }

  convertDelete(response, params) {
    return this._helper.extractFromDelete(response.headers, response.data, params);
  }
}