import { BaseHandler } from './BaseHandler'
import {stringify} from 'query-string'

//relation between the default key for items in AOR and API for this entity
const MTC_KEY_ATTRIBUTE = 'id'
const AOR_KEY_ATTRIBUTE = 'id' // <- Its the same in all objects

export class InstitutionHandler extends BaseHandler {
    /**
     * 
     * @param {*string} _urlApi The base path to api root
     * @param {*string} _path The path to resource
     */
    constructor(_urlApi) {
        super(_urlApi, "institution")
    }
    
    /**
     * Handle the puts actions to update a item
     * @param {*Object} param0 Object with props 'id', 'data' and 'previousData' that contais the id of item to update, data to update and de previous data if its needed
     * @param {*} resource The resource name
     */
    UPDATE({ id, data, previousData }) { 
        delete data.id
        delete data.therapist
        return super.UPDATE({ id,data,previousData})
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
        const managerURL = item.manager.split("/")
        const aux = {
            ...item,
            manager: managerURL[managerURL.length -1],
            [AOR_KEY_ATTRIBUTE] : item[MTC_KEY_ATTRIBUTE]
        }
        return aux
    }
    responseTransform(responseData){

        if (!responseData)
            return !console.log("NO HAY DATOS") && []

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