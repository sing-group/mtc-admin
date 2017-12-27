import check from "check-types";

import DefaultGetAdapter from "./DefaultGetRequestAdapter";
import DefaultListAdapter from "./DefaultGetListRequestAdapter";
import DefaultCreateAdapter from "./DefaultCreateRequestAdapter";
import DefaultUpdateAdapter from "./DefaultUpdateRequestAdapter";
import DefaultDeleteAdapter from "./DefaultDeleteRequestAdapter";
import ParamsMapper from "./ParamsMapper";

export default class RequestAdapters {
  static buildFor(
    paramsMapper,
    additionalAdapters = {}
  ) {
    check.assert.instance(paramsMapper, ParamsMapper, "paramsMapper should be an instance of ParamsMapper");

    const adapters = Object.assign(
      {
        GET_ONE: new DefaultGetAdapter(params => paramsMapper.convertParamsToId(params)),
        GET_LIST: new DefaultListAdapter(paramName => paramsMapper.convertParamName(paramName)),
        CREATE: new DefaultCreateAdapter(params => paramsMapper.convertParamsToData(params)),
        UPDATE: new DefaultUpdateAdapter(params => paramsMapper.convertParamsToIdAndData(params)),
        DELETE: new DefaultDeleteAdapter(params => paramsMapper.convertParamsToId(params))
      },
      additionalAdapters
    );

    return new RequestAdapters(adapters);
  }

  constructor(adapters) {
    Object.assign(this, adapters);
  }
}