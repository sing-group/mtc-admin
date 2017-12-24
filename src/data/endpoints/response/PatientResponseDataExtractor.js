import check from "check-types";

import ResponseDataExtractorHelper from "./ResponseDataExtractorHelper";

export default class PatientResponseDataExtractor {
  constructor() {
    this._helper = new ResponseDataExtractorHelper(data => {
      const assignedSessions = {};

      if (check.assigned(data.assignedSession)) {
        assignedSessions.assignedSessions = data.assignedSession.map(as => as.id)
      }

      return Object.assign({}, data, assignedSessions, {
        id: data.login,
        therapist: data.therapist.login,
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