import {BaseHandler} from './BaseHandler';

import {LOCAL_STORAGE_USER_NAME_KEY, LOCAL_STORAGE_USER_ROLE_KEY} from '../../customControllers/AuthController';

import {THERAPIST} from '../../customControllers/PermissionsController';


//relation between the default key for items in AOR and API for this entity
const MTC_KEY_ATTRIBUTE = 'login';
const AOR_KEY_ATTRIBUTE = 'id'; // <- Its the same in all objects

export class PatientHandler extends BaseHandler {
  /**
   *
   * @param {*string} _urlApi The base path to api root
   * @param {*string} _path The path to resource
   */
  constructor(_urlApi) {
    super(_urlApi, "patient");
  }

  /**
   * Handles GET actions to API
   * @param {*Object} param0 Params to build the url
   * @param {*string} resource The resource name ej 'therapist'
   */
  GET_LIST({pagination: {page, perPage}, sort: {field, order}, filter}) {
    field = field == AOR_KEY_ATTRIBUTE ? MTC_KEY_ATTRIBUTE : field;
    return super.GET_LIST({pagination: {page, perPage}, sort: {field, order}, filter});
  }

  /**
   * Handles POST new item actions to API
   * @param {*Object} param0 Object with the prop 'data' that contains the values to create the resource item
   * @param {*string} resource The resource name
   */
  CREATE({data}) {
    const loginUser = localStorage.getItem(LOCAL_STORAGE_USER_NAME_KEY);
    const permission = localStorage.getItem(LOCAL_STORAGE_USER_ROLE_KEY);

    if (!data.therapist) {
      if (permission == THERAPIST)
        data.therapist = loginUser;
      else
        throw new Error("Must specify a therapist");
    }
    return super.CREATE({data});
  }

  /**
   * Handle the puts actions to update a item
   * @param {*Object} param0 Object with props 'id', 'data' and 'previousData' that contais the id of item to update, data to update and de previous data if its needed
   * @param {*} resource The resource name
   */
  UPDATE({id, data, previousData}, resource) {
    const url = `${this.url}/${resource || this.path}/${id}`;

    const updateData = {
      password: data.password
    };

    const options = {
      method: 'PUT',
      body: JSON.stringify(updateData)
    };

    return {url, options};
  }


  RESPONSE_GET_LIST(response, params) {
    const parsedResponse = super.RESPONSE_GET_LIST(response, params);

    parsedResponse.data = this.responseTransform(parsedResponse.data);

    return parsedResponse;
  }

  RESPONSE_GET_MANY_REFERENCE(response, params) {
    return this.RESPONSE_GET_LIST(response, params);
  }

  RESPONSE_CREATE(response, params) {
    return {
      data: this.responseTransform(params.data)
    };
  }

  RESPONSE(response, params) {
    const parsedResponse = super.RESPONSE(response, params);

    parsedResponse.data = this.responseTransform(parsedResponse.data);

    return parsedResponse;
  }

  //TODO: Do this with classes
  /**
   * Maps the MTC API entities in to AOR objects
   * @param {*array} item Manager JSON from MTC API
   */
  objectBuilder(item) {
    return {
      ...item,
      assignedSession: item.assignedSession ? item.assignedSession.map(as => as.id) : [],
      [AOR_KEY_ATTRIBUTE]: item[MTC_KEY_ATTRIBUTE]
    };
  }
}