import {BaseHandler} from './BaseHandler';

import {checkLoggedUser} from '../../customControllers/AuthController';

import {MANAGER} from '../../customControllers/PermissionsController';

//relation between the default key for items in AOR and API for this entity
const MTC_KEY_ATTRIBUTE = 'login';
const AOR_KEY_ATTRIBUTE = 'id'; // <- Its the same in all objects

export class TherapistHandler extends BaseHandler {
  /**
   *
   * @param {*string} _urlApi The base path to api root
   * @param {*string} _path The path to resource
   */
  constructor(_urlApi) {
    super(_urlApi, "therapist");
  }

  /**
   * Handles GET actions to API
   * @param {*Object} param0 Params to build the url
   * @param {*string} resource The resource name ej 'therapist'
   */
  GET_LIST({pagination: {page, perPage}, sort: {field, order}, filter}) {
    field = field == AOR_KEY_ATTRIBUTE ? MTC_KEY_ATTRIBUTE : field;

    let manager = undefined;

    if (manager = checkLoggedUser(MANAGER)) {
      return super.GET_LIST({pagination: {page, perPage}, sort: {field, order}, filter}, `manager/${manager}/therapist`);
    } else {
      return super.GET_LIST({pagination: {page, perPage}, sort: {field, order}, filter});
    }
  }

  /**
   * Handle the puts actions to update a item
   * @param {*Object} param0 Object with props 'id', 'data' and 'previousData' that contais the id of item to update, data to update and de previous data if its needed
   * @param {*} resource The resource name
   */
  UPDATE({id, data, previousData}, resource) {
    const url = `${this.url}/${resource || this.path }/${data.login}`;

    const managerData = {
      email: data.email,
      name: data.name,
      surname: data.surname,
      institution: data.institution
    };

    if (data.password)
      managerData.password = data.password;

    const options = {
      method: 'PUT',
      body: JSON.stringify(managerData)
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
      institution: item.institution.id,
      [AOR_KEY_ATTRIBUTE]: item[MTC_KEY_ATTRIBUTE]
    };
  }

}