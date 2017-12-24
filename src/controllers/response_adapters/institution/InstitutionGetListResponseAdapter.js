import check from "check-types";
import {getUserName, isUserInRole} from "../../AuthController";
import {MANAGER} from "../../PermissionsController";

export default class InstitutionGetListResponseAdapter {
  adapt(extractor, response, params) {
    check.assert.object(response, "response should be an object");
    check.assert.object(params, "params should be an object");

    response.data = response.json;

    if (isUserInRole(MANAGER)) {
      check.assert.function(extractor.convertListByManager, "extractor should have a convertListByManager method");

      return extractor.convertListByManager(response, getUserName());
    } else {
      check.assert.function(extractor.convertList, "extractor should have a convertList method");

      return extractor.convertList(response, params);
    }
  }
}