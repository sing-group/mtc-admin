import check from "check-types";
import {MANAGER} from "../../PermissionsController";
import AuthController from "../../AuthController";

export default class InstitutionGetListResponseAdapter {
  constructor(authController) {
    check.assert.instance(authController, AuthController, "authController should be an instance of AuthController");

    this._authController = authController;
  }

  adapt(extractor, response, params) {
    check.assert.object(response, "response should be an object");
    check.assert.object(params, "params should be an object");

    response.data = response.json;

    if (this._authController.isUserInRole(MANAGER)) {
      check.assert.function(extractor.convertListByManager, "extractor should have a convertListByManager method");

      return extractor.convertListByManager(response, this._authController.getUserName());
    } else {
      check.assert.function(extractor.convertList, "extractor should have a convertList method");

      return extractor.convertList(response, params);
    }
  }
}