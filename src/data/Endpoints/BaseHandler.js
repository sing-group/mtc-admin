import {stringify} from 'query-string';

import {API_CONTRACT} from '../../config';
import flattenObject from '../../utils/flattenObject';

/**
 * Generates the api's urls for different actions
 */
export class BaseHandler {
  /**
   *
   * @param {*string} _urlApi The base path to api root
   * @param {*string} _path The path to resource
   */
  constructor(_urlApi, _path) {
    this.path = _path;
    this.url = _urlApi;
  }

  queryBuilder({pagination: {page = 1, perPage = 10}, sort: {field, order}, filter}) {
    //Query params
    const query = {
      ...flattenObject(filter)
    };

    if (Number.isNaN(page))
      page = 1;

    //fills the object query with the params needed
    query[API_CONTRACT.sortByFieldQuery] = field;
    query[API_CONTRACT.sortSpecificationQuery] = order;
    query[API_CONTRACT.paginationStartItemPositionQuery] = (page - 1) * perPage;
    query[API_CONTRACT.paginationLastItemPositionQuery] = page * perPage;

    return query;
  }

  /**
   * Handles GET actions to API
   * @param {*Object} param0 Params to build the url
   * @param {*string} resource The resource name ej 'therapist'
   */
  GET_LIST({pagination: {page, perPage}, sort: {field, order}, filter}, resource) {
    const query = this.queryBuilder(
      {pagination: {page, perPage}, sort: {field, order}, filter}
    );
    const url = `${this.url}/${resource || this.path}?${stringify(query)}`;

    return {url, options: {}};
  }

  /**
   * Handles GET by ID actions to API
   * @param {*Object} param0 Object with the prop id of the resource to get
   * @param {*string} resource The resource name ej 'therapist'
   */
  GET_ONE({id}, resource) {
    const url = `${this.url}/${resource || this.path}/${id}`;

    return {url, options: {}};
  }

  /**
   * Handles POST new item actions to API
   * @param {*Object} param0 Object with the prop 'data' that contais the values to create the resource item
   * @param {*string} resource The resoruce name
   */
  CREATE({data}, resource) {
    const url = `${this.url}/${resource || this.path}`;

    delete data.role;

    const options = {
      method: 'POST',
      body: JSON.stringify(data)
    };

    return {url, options};
  }

  /**
   * Handle the puts actions to update a item
   * @param {*Object} param0 Object with props 'id', 'data' and 'previousData' that contais the id of item to update, data to update and de previous data if its needed
   * @param {*} resource The resource name
   */
  UPDATE({id, data, previousData}, resource) {
    const url = `${this.url}/${resource || this.path}/${id}`;

    const options = {
      method: 'PUT',
      body: JSON.stringify(data)
    };

    return {url, options};
  }

  /**
   * Handles de delete actions of an item to API
   * @param {*Object} param0 Object with the id and the previous data of the item to remove
   * @param {*string} resource The resource name
   */
  DELETE({id, previousData}, resource) {
    const url = `${this.url}/${resource || this.path}/${id}`;

    const options = {
      method: 'DELETE'
    };

    return {url, options};
  }

  /**
   * Handles the relations ONE to MANY between entities
   * @param {*Object} param0 Object with props:
   target -> the foreign key
   id -> the id of the foreign key (ONE SIDE)
   ... -> params for sort or filtering
   * @param {*String} resource The resource name
   */
  GET_MANY_REFERENCE({target, id, pagination: {page, perPage}, sort: {field, order}, filter}, resource) {
    const query = this.queryBuilder({pagination: {page, perPage}, sort: {field, order}, filter});

    query[target] = id;

    const url = `${this.url}/${this.path || resource}?${stringify(query)}`;

    return {url, options: {}};
  }

  // The next methods handle the translations bettween the API's responses and the AOR
  RESPONSE_GET_LIST({headers, json}, params, resource) {
    const data = {
      data: json || []
    };

    if (headers.has('X-Total-Count')) {
      data.total = parseInt(headers.get('X-Total-Count'));
    }

    return data;
  }

  RESPONSE_GET_MANY_REFERENCE(response, params, resource) {
    return this.RESPONSE_GET_LIST(response, params, resource)
  }

  RESPONSE_CREATE({headers, json}, params, resource) {
    return {data: {...params.data, id: headers && headers.get('Location') || null}};
  }

  RESPONSE_DELETE({headers, json}, params, resource) {
    return {data: {...params.data, id: json && json.id || null}};
  }

  RESPONSE({headers, json}, params, resource) {
    return {data: json};
  }

  responseTransform(responseData) {
    if (!responseData)
      return responseData;

    if (!(responseData instanceof Array)) {
      return this.objectBuilder(responseData);
    }

    return responseData.map(item => this.objectBuilder(item), this);
  }
}