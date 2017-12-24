import ResponseDataExtractorHelper from "./ResponseDataExtractorHelper";

export default class InstitutionResponseDataExtractor {
  constructor() {
    this._helper = new ResponseDataExtractorHelper(data => {
      return Object.assign({}, data, {
        manager: data.manager.login
      });
    });
  }

  convertGet(response) {
    return this._helper.extractFromGet(response.headers, response.data);
  }

  convertList(response) {
    return this._helper.extractFromList(response.headers, response.data);
  }

  convertListByManager(response, managerLogin) {
    return this._helper.extractFromListBy(response.headers, response.data, "manager", managerLogin);
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