import check from "check-types";

export default class DefaultResponseGetAdapter {
  adapt(extractor, response, params) {
    check.assert.function(extractor.convertGet, "extractor should have a convertGet method");
    check.assert.object(response, "response should be an object");

    response.data = response.json;

    return extractor.convertGet(response);
  }
}