import {parse} from 'query-string';

const initialState = {
  patient: {
    editing: null
  }
};

export default (previousState = initialState, {type, payload}) => {
  const newContext = previousState;

  if (type === '@@router/LOCATION_CHANGE') {
    if (payload.pathname === "/assignedSession" && parse(payload.search).patient !== undefined) {
      newContext.patient.editing = parse(payload.search).patient
    }
  }

  return newContext;
}