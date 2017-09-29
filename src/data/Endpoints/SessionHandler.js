import { BaseHandler } from './BaseHandler'
import {stringify} from 'query-string'

//relation between the default key for items in AOR and API for this entity
const MTC_KEY_ATTRIBUTE = 'id'
const AOR_KEY_ATTRIBUTE = 'id' // <- Its the same in all objects

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
    GET_LIST({ pagination: { page, perPage }, sort: { field, order }, filter }) {

        const loginUser = filter.loginUser || localStorage.getItem("username")
        delete filter.loginUser

        field = field == AOR_KEY_ATTRIBUTE ? MTC_KEY_ATTRIBUTE : field
        return super.GET_LIST({ pagination: { page, perPage }, sort: { field, order }, filter },`therapist/${loginUser}/gamesession`)
    }

    /**
     * Handles POST new item actions to API
     * @param {*Object} param0 Object with the prop 'data' that contais the values to create the resource item
     * @param {*string} resource The resoruce name
     */
    CREATE({ data }) {
        const loginUser = localStorage.getItem("username")
        return super.CREATE({ data },`therapist/${loginUser}/gamesession`)
     }

    /**
     * Handles GET by ID actions to API 
     * @param {*Object} param0 Object with the prop id of the resource to get
     * @param {*string} resource The resource name ej 'therapist'
     */
    GET_ONE({ id }) { 
        return super.GET_ONE({id},"game/session")
    }


    RESPONSE_GET_LIST(response, params) {
        console.log("HANDLE GET_LIST", response, params)
        const parsedResponse = super.RESPONSE_GET_LIST(response,params)
        parsedResponse.data = this.responseTransform(parsedResponse.data) 
        console.log("HANDLE GET_LIST PARSED", parsedResponse)
        return parsedResponse
    }
    RESPONSE_GET_MANY_REFERENCE(response, params) {
        console.log("HADLE GET_MANY_REFERENCE", response, params)
        return this.RESPONSE_GET_LIST(response, params)
    }

    RESPONSE_CREATE(response, params) {
        console.log("HANDLE CREATE", response, params)
        const parsedResponse = {
            data : params.data
        }
        parsedResponse.data = this.responseTransform(parsedResponse.data)
        console.log("HANDLE CREATE PARSED", parsedResponse)
        return parsedResponse
    }

    RESPONSE(response, params) {
        console.log("HANDLE RESPONSE", response, params)
        const parsedResponse = super.RESPONSE(response,params)
        parsedResponse.data = this.responseTransform(parsedResponse.data) 

        console.log("HANDLE RESPONSE PARSED", parsedResponse)
        return parsedResponse
    }


    //TODO: Do this with classes
    /**
     * Maps the MTC API entities in to AOR objects
     * @param {*array} item Manager JSON from MTC API
     */
    objectBuilder(item){
        const institutionURL = item.institution.split("/")
        const aux = {
            ...item,
            institution: institutionURL[institutionURL.length -1],
            [AOR_KEY_ATTRIBUTE] : item[MTC_KEY_ATTRIBUTE]
        }
        return aux
    }
    responseTransform(responseData){

        if (!responseData)
            return !console.log("NO HAY DATOS") && responseData

        if(!(responseData instanceof Array) ) {
            return !console.log("ES OBJETO") && this.objectBuilder(responseData)
        }

        const aux = []
        responseData.forEach(function(item) {
            aux.push(this.objectBuilder(item))
        },this);
        return aux
    }

}