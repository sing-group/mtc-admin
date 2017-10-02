const ADMIN = "ADMIN"
const MANAGER = "MANAGER"
const THERAPIST = "THERAPIST"
const PATIENT = "PATIENT"


 const resolveAccess = ({ resource, permissions, exact, value, action }) => {
    // value = the requested permissions specified in the `permissions` prop (eg `admin`). May be undefined
    // resource = the requested resource (eg `posts`)
    // exact = the value of the `exact` prop
    // permissions = the result of the authClient call
    console.log("RESOLVING"+ action)
    console.log("resource",resource)
    console.log("arguments",resource.props.name, resource.props.permissions, permissions, exact, value)
    

    return  resource.props.permissions == permissions
};


 export {
    ADMIN,
    MANAGER,
    THERAPIST,
    PATIENT,
    resolveAccess,
 }

