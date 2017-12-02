const ADMIN = "ADMIN"
const MANAGER = "MANAGER"
const THERAPIST = "THERAPIST"
const PATIENT = "PATIENT"

const permisions = {
    ADMIN : ['manager','institution'],
    MANAGER : ['institution','therapist'],
    THERAPIST : ['session', 'patient'],
    PATIENT : []
}


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

const getPermissions = (role) => {
    console.log("ROLE", role)
    if (!role)
    return []
    if ([ADMIN,MANAGER,THERAPIST,PATIENT].indexOf(role) == -1)
        throw new Error("BAD ROLE")

    return permisions[role]
}

 export {
    ADMIN,
    MANAGER,
    THERAPIST,
    PATIENT,
    resolveAccess,
    getPermissions
 }

