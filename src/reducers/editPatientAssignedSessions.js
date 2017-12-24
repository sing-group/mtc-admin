import {LIST} from "admin-on-rest";

export const LIST_PATIENT_ASSIGNED_SESSIONS = "LIST_PATIENT_ASSIGNED_SESSIONS";

export const listPatientAssignedSessions = (id, data) => ({
  type: LIST_PATIENT_ASSIGNED_SESSIONS,
  payload: {id, data: data},
  meta: {resource: 'assigned-session', fetch: LIST, cancelPrevious: false}
});