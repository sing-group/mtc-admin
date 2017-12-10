import {DELETE} from 'admin-on-rest';

export const deleteAssignment = (id, data, basePath) => ({
  type: DELETE,
  payload: {id, basePath: '/patient'},
  meta: {resource: 'assignedSession', fetch: DELETE, cancelPrevious: true},
});