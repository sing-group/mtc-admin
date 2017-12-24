import check from "check-types";

export default class InstitutionListByManagerResponseAdapter {
  adapt(extractor, response, params) {
    check.assert.object(response, "response should be an object");
    check.assert.object(params, "params should be an object");

    if (params.target === "manager") {
      check.assert.nonEmptyString(params.id, "params should have a non empty string attribute id");
      check.assert.function(extractor.convertListByManager, "extractor should have a convertListByManager method");

      response.data = response.json;

      return extractor.convertListByManager(response, params.id);
    } else {
      throw new Error("Unsupported target for response: " + params.target);
    }
  }
}