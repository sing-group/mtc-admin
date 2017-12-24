import DefaultGetAdapter from "./DefaultResponseGetAdapter";
import DefaultGetListAdapter from "./DefaultResponseListAdapter";
import DefaultCreateAdapter from "./DefaultResponseCreateAdapter";
import DefaultUpdateAdapter from "./DefaultResponseUpdateAdapter";
import DefaultDeleteAdapter from "./DefaultResponseDeleteAdapter";

export default {
  GET_ONE: new DefaultGetAdapter(),
  GET_LIST: new DefaultGetListAdapter(),
  CREATE: new DefaultCreateAdapter(),
  UPDATE: new DefaultUpdateAdapter(),
  DELETE: new DefaultDeleteAdapter()
};