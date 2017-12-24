import check from "check-types";

import ResponseDataExtractorHelper from "./ResponseDataExtractorHelper";

export default class ManagerResponseDataExtractor {
  constructor() {
    this._helper = new ResponseDataExtractorHelper(data => {
      const institutions = {}
      if (check.assigned(data.institutions)) {
        institutions.institutions = data.institutions.map(i => i.id);
      }

      return Object.assign({}, data, institutions, {
        fullname: data.name + " " + data.surname,
        id: data.login
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
    return this._helper.extractFromUpdate(response.headers, response.data, params)
  }

  convertDelete(response, params) {
    return this._helper.extractFromDelete(response.headers, response.data, params);
  }
}