import {DELETE} from 'admin-on-rest';

export const deleteAssignment = (id) => ({
  type: DELETE,
  payload: {id, basePath: '/patient'},
  meta: {resource: 'assigned-session', fetch: DELETE, cancelPrevious: true},
});