import check from "check-types";

export default class DefaultResponseCreateAdapter {
  adapt(extractor, response, params) {
    check.assert.function(extractor.convertCreate, "extractor should have a convertCreate method");
    check.assert.object(response, "response should be an object");
    check.assert.object(params, "params should be an object");

    response.data = response.json;

    return extractor.convertCreate(response, params);
  }
}