const ADMIN = "ADMIN";
const MANAGER = "MANAGER";
const THERAPIST = "THERAPIST";
const PATIENT = "PATIENT";

const permissions = {
  ADMIN: ['manager', 'institution'],
  MANAGER: ['institution', 'therapist'],
  THERAPIST: ['session', 'patient'],
  PATIENT: []
};


// eslint-disable-next-line no-unused-vars
const resolveAccess = ({resource, permissions, exact, value, action}) => {
  // value = the requested permissions specified in the `permissions` prop (eg `admin`). May be undefined
  // resource = the requested resource (eg `posts`)
  // exact = the value of the `exact` prop
  // permissions = the result of the authClient call
  return resource.props.permissions === permissions;
};

const getPermissions = (role) => {
  if (!role)
    return [];
  if ([ADMIN, MANAGER, THERAPIST, PATIENT].indexOf(role) === -1)
    throw new Error("BAD ROLE");

  return permissions[role];
};

export {
  ADMIN,
  MANAGER,
  THERAPIST,
  PATIENT,
  resolveAccess,
  getPermissions
};

