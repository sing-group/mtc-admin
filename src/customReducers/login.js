import { USER_LOGIN_SUCCESS, USER_LOGOUT } from 'admin-on-rest';

export default (previousState = {}, { type, payload }) => {
    if (type == USER_LOGIN_SUCCESS)
    {
        console.log("ALMACENADO USUARIO", payload.id)
        return {
            id : payload.id
        }
    }

    if (type == USER_LOGOUT){
        console.log("BORRADO USUARIO")
        return {}
    }

    return previousState;
}