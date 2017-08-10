const GENERAL_ADMIN = "GA"
const CENTER_DIRECTOR = "CD"
const THERAPIST = "T"

 const resolveAccess = ({ resource, permissions, exact, value }) => {
    // value = the requested permissions specified in the `permissions` prop (eg `admin`). May be undefined
    // resource = the requested resource (eg `posts`)
    // exact = the value of the `exact` prop
    // permissions = the result of the authClient call
    console.log("resource",resource)
    console.log("arguments",resource.props.name, resource.props.permissions, permissions, exact, value)
    

    return  resource.props.permissions == permissions
};

 export {
    GENERAL_ADMIN,
    CENTER_DIRECTOR,
    THERAPIST,
    resolveAccess
 }

