import {BaseHandler} from './BaseHandler';

import {LOCAL_STORAGE_USER_NAME_KEY} from '../../controllers/AuthController';

//relation between the default key for items in AOR and API for this entity
const MTC_KEY_ATTRIBUTE = 'id';
const AOR_KEY_ATTRIBUTE = 'id'; // <- Its the same in all objects

export class SessionHandler extends BaseHandler {
  /**
   *
   * @param {*string} _urlApi The base path to api root
   * @param {*string} _path The path to resource
   */
  constructor(_urlApi) {
    super(_urlApi, null) //its null cause the resource will be set on each method
  }

  /**
   * Handles GET actions to API
   * @param {*Object} param0 Params to build the url
   * @param {*string} resource The resource name ej 'therapist'
   */
  GET_LIST({pagination: {page, perPage}, sort: {field, order}, filter}) {
    const loginUser = filter.loginUser || localStorage.getItem(LOCAL_STORAGE_USER_NAME_KEY);
    delete filter.loginUser;

    field = field == AOR_KEY_ATTRIBUTE ? MTC_KEY_ATTRIBUTE : field;
    return super.GET_LIST({
      pagination: {page, perPage},
      sort: {field, order},
      filter
    }, `therapist/${loginUser}/games-session`)
  }

  /**
   * Handles POST new item actions to API
   * @param {*Object} param0 Object with the prop 'data' that contais the values to create the resource item
   * @param {*string} resource The resoruce name
   */
  CREATE({data}) {
    const loginUser = localStorage.getItem(LOCAL_STORAGE_USER_NAME_KEY);
    return super.CREATE({data}, `therapist/${loginUser}/games-session`)
  }

  UPDATE({id, data, previousData}) {
    const sendData = {
      game: data.game,
      name: data.name,
      description: data.description
    };
    return super.UPDATE({id, data: sendData, previousData}, "games-session");
  }

  /**
   * Handles GET by ID actions to API
   * @param {*Object} param0 Object with the prop id of the resource to get
   * @param {*string} resource The resource name ej 'therapist'
   */
  GET_ONE({id}) {
    return super.GET_ONE({id}, "games-session");
  }

  RESPONSE_GET_LIST(response, params) {
    const parsedResponse = super.RESPONSE_GET_LIST(response, params);

    parsedResponse.data = this.responseTransform(parsedResponse.data);

    parsedResponse.data.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

    return parsedResponse;
  }

  RESPONSE_GET_MANY_REFERENCE(response, params) {
    return this.RESPONSE_GET_LIST(response, params)
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
    const plainNameLocales = {};
    item.name.values && item.name.values.forEach(n => plainNameLocales["name" + n.key] = n.value);

    return {
      ...item,
      ...plainNameLocales,
      [AOR_KEY_ATTRIBUTE]: item[MTC_KEY_ATTRIBUTE]
    };
  }
}