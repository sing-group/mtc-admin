import check from "check-types";

import ResponseDataExtractorHelper from "./ResponseDataExtractorHelper";

export default class AssignedGamesSessionResponseDataExtractor {
  constructor() {
    this._helper = new ResponseDataExtractorHelper(data => {
      const assignedGamesSessions = {};

      if (check.assigned(data.gamesSession) && check.assigned(data.gamesSession.id)) {
        assignedGamesSessions.assignedGamesSessions = data.gamesSession.id;
      }

      return Object.assign({}, data, assignedGamesSessions, {
        session: data.assignedGamesSessions,
        patient: data.patient.login
      });
    });
  }

  convertGet(response) {
    return this._helper.extractFromGet(response.headers, response.data);
  }

  convertList(response) {
    return this._helper.extractFromList(response.headers, response.data);
  }

  convertListByPatient(response, patientLogin) {
    return this._helper.extractFromListBy(response.headers, response.data, "patient", patientLogin);
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