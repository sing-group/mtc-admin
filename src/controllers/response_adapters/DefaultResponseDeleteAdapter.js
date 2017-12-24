import check from "check-types";

export default class DefaultResponseDeleteAdapter {
  adapt(extractor, response, params) {
    check.assert.function(extractor.convertDelete, "extractor should have a convertDelete method");
    check.assert.object(response, "response should be an object");
    check.assert.object(params, "params should be an object");

    response.data = response.json;

    return extractor.convertDelete(response, params);
  }
}