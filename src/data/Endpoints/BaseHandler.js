
import { stringify } from 'query-string';

import { API_CONTRACT } from '../../config'
import flattenObject from '../../utils/flattenObject'

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
        this.Path = _path
        this.URL = _urlApi
    }

    queryBuilder({ pagination: { page = 1, perPage = 10 }, sort: { field, order }, filter }) {
        //Query params
        const query = {
            /**
             * -----> flattenObject() <-----
             * 
             * Plains a object with the diferent filters ej for filter therapist
             * filterObject =  
             * { 
             *  id_institution : "algo",
             *  personalData : {
             *      sex : "male"
             *  }
             * } 
             *     
             * BECOMES IN:
             *  {
             *      id_institution: "algo"
             *      sex : "male"
             *  }
             *      
             *  This enables for 'stringify' method parse any structure of filters in to a plain query to API
             * 
             *  ?......&id_institution=algo&sex=male&.....
             */
            ...flattenObject(filter)
        };
        if (Number.isNaN(page))
            page = 1
        //fills the object query with the params needed
        query[API_CONTRACT.sortByFieldQuery] = field
        query[API_CONTRACT.sortSpecificationQuery] = order
        query[API_CONTRACT.paginationStartItemPositionQuery] = (page - 1) * perPage
        query[API_CONTRACT.paginationLastItemPositionQuery] = page * perPage

        return query
    }

    /**
     * Handles GET actions to API
     * @param {*Object} param0 Params to build the url
     * @param {*string} resource The resource name ej 'therapist'
     */
    GET_LIST({ pagination: { page, perPage }, sort: { field, order }, filter }, resource) {
        console.log("REQUESTING GET_LIST",{ pagination: { page, perPage }, sort: { field, order }, filter }, resource || this.Path)

        const query = this.queryBuilder({ pagination: { page, perPage }, sort: { field, order }, filter })
        const url = `${this.URL}/${resource || this.Path}?${stringify(query)}`;

        console.log("URL GET_LIST", url)
        return { url, options: {} }
    }


    /**
     * Handles GET by ID actions to API 
     * @param {*Object} param0 Object with the prop id of the resource to get
     * @param {*string} resource The resource name ej 'therapist'
     */
    GET_ONE({ id }, resource) { 
        console.log("REQUESTING GET_ONE",{ id }, resource || this.Path)
        const url = `${this.URL}/${resource || this.Path}/${id}`;
        console.log("URL GET_ONE", url)
        return { url, options: {} }
    }

    /**
     * Handles POST new item actions to API
     * @param {*Object} param0 Object with the prop 'data' that contais the values to create the resource item
     * @param {*string} resource The resoruce name
     */
    CREATE({ data }, resource) {
        console.log("REQUESTING CREATE",{ data }, resource || this.Path)
        const url = `${this.URL}/${resource || this.Path}`;

        const options = {}

        options.method = 'POST';
        options.body = JSON.stringify(data);

        console.log("URL CREATE", url)
        return { url, options }
     }

    /**
     * Handle the puts actions to update a item
     * @param {*Object} param0 Object with props 'id', 'data' and 'previousData' that contais the id of item to update, data to update and de previous data if its needed
     * @param {*} resource The resource name
     */
    UPDATE({ id, data, previousData },resource) { 
        console.log("REQUESTING UPDATE",{ id, data, previousData }, resource || this.Path)
        const url = `${this.URL}/${resource || this.Path }/${id}`;
        
        const options = {}

        options.method = 'PUT';
        options.body = JSON.stringify(data);

        console.log("URL UPDATE", url)
        return { url, options }
    }
    /**
     * Handles de delete actions of an item to API
     * @param {*Object} param0 Object with the id and the previous data of the item to remove
     * @param {*string} resource The resource name
     */
    DELETE({ id, previousData }, resource) {
        console.log("REQUESTING DELETE",{ id, previousData }, resource || this.Path)
        const url = `${this.URL}/${resource || this.Path}/${id}`;
        
        const options = {}
        options.method = 'DELETE';

        console.log("URL DELETE", url)
        return { url, options }
     }
     /**
      * Handles the relations ONE to MANY between entities
      * @param {*Object} param0 Object with props: 
            target -> the foreign key
            id -> the id of the foreign key (ONE SIDE)
            ... -> params for sort or filtering
      * @param {*String} resource The resource name
      */
    GET_MANY_REFERENCE({ target, id, pagination: { page, perPage }, sort: { field, order }, filter }, resource) {
        console.log("REQUESTING GET_MANY_REFERENCE",{ target, id, pagination: { page, perPage }, sort: { field, order }, filter }, resource)

        const query = this.queryBuilder({ pagination: { page, perPage }, sort: { field, order }, filter });
        query[target] = id;
        const url = `${this.URL}/${this.Path ||  resource}?${stringify(query)}`;

        console.log("URL GET_MANY_REFERENCE", url)
        return { url, options: {} }


    }

    // The next methods handle the translations bettween the API's responses and the AOR

    RESPONSE_GET_LIST({ headers, json }, params, resource){
        /*if (!headers.has('X-Total-Count')) {
            throw new Error(
                'The X-Total-Count header is missing in the HTTP Response. The jsonServer REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
            );
        }*/
        return {
            data: json ? json : [],
            total: parseInt(
                /*headers
                    .get('X-Total-Count')
                    .split('/')
                    .pop()*/
                    10,
                10
            ),
        };
    }
    RESPONSE_GET_MANY_REFERENCE(response, params,resource) {
        return this.RESPONSE_GET_LIST(response,params,resource)
    }

    RESPONSE_CREATE ({ headers, json }, params,resource) {
        return { data: { ...params.data, id: headers && headers.get('Location') || "NOIDRECIBIDO"} }; //TODO: borrar esto. El ID recibido se debe usar cuando se quiere hacer una redirección del elemento creado a la vista "Show". Por ahora en los elementos tras crearlo se redirige a "List" donde se recargan los items de la API y ya vienen con el ID correcto
    }

    RESPONSE_DELETE ({ headers, json }, params,resource) {
        return { data: { ...params.data, id: json && json.id || "NOIDRECIBIDO" } }; // Supongo que algo similar a lo de arriba
    }

    RESPONSE ({ headers, json }, params,resource){
        return { data: json };
    }
}