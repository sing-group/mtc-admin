import {BaseHandler} from './BaseHandler';
import {ManagerHandler} from './ManagerHandler';
import {InstitutionHandler} from './InstitutionHandler';
import {TherapistHandler} from './TherapistHandler';
import {PatientHandler} from './PatientHandler';
import {SessionHandler} from './SessionHandler';
import {AssignedSessionHandler} from './AssignedSessionHandler';

//Import the entities to handle the endpoints (resources)
export const getHandlers = (URL_API) => {
  return {
    // resource :  new InstanceOfHandlerResource()
    patient: new PatientHandler(URL_API),
    session: new SessionHandler(URL_API),
    assignedSession: new AssignedSessionHandler(URL_API),
    therapist: new TherapistHandler(URL_API),
    manager: new ManagerHandler(URL_API),
    institution: new InstitutionHandler(URL_API),
    default: new BaseHandler(URL_API)
  };
};
