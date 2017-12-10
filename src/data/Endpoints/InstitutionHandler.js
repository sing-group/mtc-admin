import {BaseHandler} from './BaseHandler';

import {checkLoggedUser} from '../../customControllers/AuthController';

import {MANAGER} from '../../customControllers/PermissionsController';

//relation between the default key for items in AOR and API for this entity
const MTC_KEY_ATTRIBUTE = 'id';
const AOR_KEY_ATTRIBUTE = 'id'; // <- Its the same in all objects

const resourceName = 'institution';

export class InstitutionHandler extends BaseHandler {
  /**
   *
   * @param {*string} _urlApi The base path to api root
   * @param {*string} _path The path to resource
   */
  constructor(_urlApi) {
    super(_urlApi, resourceName);
  }

  /**
   * Handles GET actions to API
   * @param {*Object} param0 Params to build the url
   * @param {*string} resource The resource name ej 'therapist'
   */
  GET_LIST({pagination: {page, perPage}, sort: {field, order}, filter}) {
    let manager = undefined;

    if (manager = checkLoggedUser(MANAGER)) {
      return super.GET_LIST({
        pagination: {page, perPage},
        sort: {field, order},
        filter
      }, `manager/${manager}/institution`);
    } else {
      return super.GET_LIST({pagination: {page, perPage}, sort: {field, order}, filter});
    }
  }

  /**
   * Handles the relations ONE to MANY between entities
   * @param {*Object} param0 Object with props:
   target -> the foreign key
   id -> the id of the foreign key (ONE SIDE)
   ... -> params for sort or filtering
   * @param {*String} resource The resource name
   */
  GET_MANY_REFERENCE({target, id, pagination: {page, perPage}, sort: {field, order}, filter}) {
    let resource = resourceName;

    //handle the target resource to a API route
    switch (target) {
      case 'manager':
        resource = `manager/${id}/institution`;
        break;

    }
    return super.GET_LIST({pagination: {page, perPage}, sort: {field, order}, filter}, resource);
  }

  /**
   * Handle the puts actions to update a item
   * @param {*Object} param0 Object with props 'id', 'data' and 'previousData' that contais the id of item to update, data to update and de previous data if its needed
   * @param {*} resource The resource name
   */
  UPDATE({id, data, previousData}) {
    delete data.id;
    delete data.therapist;
    return super.UPDATE({id, data, previousData});
  }

  RESPONSE_GET_LIST(response, params) {
    const parsedResponse = super.RESPONSE_GET_LIST(response, params);

    parsedResponse.data = this.responseTransform(parsedResponse.data);

    return parsedResponse;
  }

  RESPONSE_GET_MANY_REFERENCE(response, params) {
    return this.RESPONSE_GET_LIST(response, params);
  }

  RESPONSE_UPDATE(response, params) {
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
      manager: item.manager.login,
      [AOR_KEY_ATTRIBUTE]: item[MTC_KEY_ATTRIBUTE]
    };
  }

}