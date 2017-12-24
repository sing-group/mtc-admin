import check from "check-types";
import ParamsMapper from "../ParamsMapper";

export default class AssignedGamesSessionParamsMapper extends ParamsMapper {
  convertParamsToId(params) {
    super._checkId(params);

    return parseInt(params.id);
  }

  convertParamsToData(params) {
    super._checkParamsData(params);

    check.assert.nonEmptyString(params.data.patient, "params.data should have a non empty string patient attribute");
    check.assert.positive(params.data.assignedGamesSessions, "params.data should have a positive integer assignedGamesSessions attribute");
    this._checkDate(params.data.startDate, "params.data should have a non empty string startDate attribute");
    this._checkDate(params.data.endDate, "params.data should have a non empty string endDate attribute");

    return {
      patient: params.data.patient,
      gamesSessionId: params.data.assignedGamesSessions,
      startDate: this._dateToTimestamp(params.data.startDate),
      endDate: this._dateToTimestamp(params.data.endDate)
    };
  }

  convertParamsToIdAndData(params) {
    super._checkParamsData(params);
    this._checkDate(params.data.startDate, "params.data should have a non empty string startDate attribute");
    this._checkDate(params.data.endDate, "params.data should have a non empty string endDate attribute");

    return {
      id: this.convertParamsToId(params),
      data: {
        startDate: this._dateToTimestamp(params.data.startDate),
        endDate: this._dateToTimestamp(params.data.endDate)
      }
    };
  }

  _checkDate(date, message) {
    if (!check.nonEmptyString(date) && !check.positive(date)) {
      throw new Error(message);
    }
  }

  _dateToTimestamp(date) {
    if (check.positive(date)) {
      return date;
    } else {
      return new Date(date).getTime();
    }
  }
}