import check from "check-types";

export default class AssignedSessionListByPatientResponseAdapter {
  adapt(extractor, response, params) {
    check.assert.object(response, "response should be an object");
    check.assert.object(params, "params should be an object");

    if (params.target === "patient") {
      check.assert.nonEmptyString(params.id, "params should have a non empty string attribute id");
      check.assert.function(extractor.convertListByPatient, "extractor should have a convertListByPatient method");

      response.data = response.json;

      return extractor.convertListByPatient(response, params.id);
    } else {
      throw new Error("Unsupported target for response: " + params.target);
    }
  }
}