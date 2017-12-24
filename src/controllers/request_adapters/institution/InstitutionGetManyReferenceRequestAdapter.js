import check from "check-types";
import QueryOptions from "../../../data/endpoints/QueryOptions";

export default class InstitutionGetManyReferenceRequestAdapter {
  adapt(builder, params) {
    check.assert.object(params, "params should be an object");
    check.assert.assigned(params.id, "params should have an id attribute");
    check.assert.assigned(params.target, "params should have a target attribute");

    if (params.target === "manager") {
      check.assert.function(builder.listByManager, "builder should have a listByManager method");

      return builder.listByManager(params.id, QueryOptions.fromAORParams(params));
    } else {
      throw new Error("Unsupported target for GET_MANY_REFERENCE type: " + params.target);
    }
  }
}