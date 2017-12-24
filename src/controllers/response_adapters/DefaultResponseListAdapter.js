import check from "check-types";

export default class DefaultResponseListAdapter {
  adapt(extractor, response, params) {
    check.assert.function(extractor.convertList, "extractor should have a convertList method");
    check.assert.object(response, "response should be an object");
    check.assert.object(params, "params should be an object");

    response.data = response.json;

    return extractor.convertList(response, params);
  }
}