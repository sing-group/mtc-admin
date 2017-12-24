import check from "check-types";

export default class DefaultResponseUpdateAdapter {
  adapt(extractor, response, params) {
    check.assert.function(extractor.convertUpdate, "extractor should have a convertUpdate method");
    check.assert.object(response, "response should be an object");
    check.assert.object(params, "params should be an object");

    response.data = response.json;

    return extractor.convertUpdate(response, params);
  }
}