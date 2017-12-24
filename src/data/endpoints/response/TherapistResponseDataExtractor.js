import ResponseDataExtractorHelper from "./ResponseDataExtractorHelper";

export default class TherapistResponseDataExtractor {
  constructor() {
    this._helper = new ResponseDataExtractorHelper(data => {
      return Object.assign({}, data, {
        id: data.login,
        institution: data.institution.id
      });
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