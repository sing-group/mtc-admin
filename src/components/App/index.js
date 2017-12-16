import React from 'react';
import {Admin, Resource} from 'admin-on-rest';
import messages from '../../i18n';
import {DEFAULT_LOCALE} from '../../i18n/localesManager';

import ManagerIcon from 'material-ui/svg-icons/action/supervisor-account';
import InstitutionIcon from 'material-ui/svg-icons/social/location-city';
import TherapistIcon from 'material-ui/svg-icons/social/person';
import PatientIcon from 'material-ui/svg-icons/social/person-outline';
import SessionIcon from 'material-ui/svg-icons/notification/event-note';
import AssignedSessionIcon from 'material-ui/svg-icons/notification/event-available';

import Dashboard from '../Dashboard';

import Sessions from '../operations/sessions/List';
import SessionCreate from '../operations/sessions/Create';
import SessionEdit from '../operations/sessions/Edit';

import Institutions from '../operations/institutions/List';
import InstitutionCreate from '../operations/institutions/Create';
import InstitutionShow from '../operations/institutions/Show';
import InstitutionEdit from '../operations/institutions/Edit';
import InstitutionDelete from '../operations/institutions/Delete';

import Managers from '../operations/managers/List';
import ManagerCreate from '../operations/managers/Create';
import ManagerShow from '../operations/managers/Show';
import ManagerEdit from '../operations/managers/Edit';
import ManagerDelete from '../operations/managers/Delete';

import Therapists from '../operations/therapists/List';
import TherapistCreate from '../operations/therapists/Create';
import TherapistShow from '../operations/therapists/Show';
import TherapistEdit from '../operations/therapists/Edit';
import TherapistDelete from '../operations/therapists/Delete';

import Patients from '../operations/patients/List';
import PatientCreate from '../operations/patients/Create';
import PatientEdit from '../operations/patients/Edit';
import PatientDelete from '../operations/patients/Delete';

import AssignedSessionCreate from '../operations/assigned_sessions/Create';
import AssignedSessionDelete from '../operations/assigned_sessions/Delete';
import AssignedSessionList from '../operations/assigned_sessions/List';
import AssignedSessionEdit from '../operations/assigned_sessions/Edit';

import {ADMIN, MANAGER, THERAPIST} from '../../controllers/PermissionsController';

import auth from '../../controllers/AuthController';
import ApiClient from '../../controllers/ApiController';
import routes from '../../routes';
import menu from '../Menu';
import login from '../../reducers/login';
import actionLogger from '../../reducers/actionLogger';
import context from '../../reducers/context';

const App = () => (
  <Admin title="MTC Admin"
         customRoutes={routes}
         menu={menu}
         customReducers={{login, context, actionLogger}}
         authClient={auth}
         dashboard={Dashboard}
         restClient={ApiClient(/*Url string param HERE overrides the API_URL in config.js*/)}
         locale={DEFAULT_LOCALE}
         messages={messages}
  >
    {permissions => [
      permissions === ADMIN ?
        <Resource
          name="manager"
          icon={ManagerIcon}
          list={permissions === ADMIN || permissions === MANAGER ? Managers : null}
          create={ManagerCreate}
          show={permissions === ADMIN || permissions === MANAGER ? ManagerShow : null}
          edit={permissions === ADMIN || permissions === MANAGER ? ManagerEdit : null}
          remove={ManagerDelete}/>
        : undefined,
      permissions === ADMIN || permissions === MANAGER ?
        <Resource
          name="institution"
          icon={InstitutionIcon}
          list={permissions === ADMIN || permissions === MANAGER ? Institutions : null}
          create={permissions === ADMIN ? InstitutionCreate : null}
          show={InstitutionShow}
          edit={permissions === ADMIN ? InstitutionEdit : null}
          remove={InstitutionDelete}/>
        : undefined,
      permissions === MANAGER ?
        <Resource
          name="therapist"
          icon={TherapistIcon}
          list={Therapists}
          create={permissions === ADMIN ? null : TherapistCreate}
          show={TherapistShow}
          edit={permissions === ADMIN ? null : TherapistEdit}
          remove={permissions === ADMIN ? null : TherapistDelete}/>
        : undefined,
      permissions === THERAPIST ?
        <Resource
          name="patient"
          icon={PatientIcon}
          list={Patients}
          create={permissions === ADMIN ? null : PatientCreate}
          //show={PatientShow}
          edit={permissions === ADMIN ? null : PatientEdit}
          remove={permissions === ADMIN ? null : PatientDelete}/>
        : undefined,
      permissions === THERAPIST ?
        <Resource
          name="session"
          icon={SessionIcon}
          list={Sessions}
          edit={SessionEdit}
          create={permissions === ADMIN ? null : SessionCreate}/>
        : undefined,
      permissions === THERAPIST ?
        <Resource
          name="assignedSession"
          icon={AssignedSessionIcon}
          create={permissions === ADMIN ? null : AssignedSessionCreate}
          //showList={false}
          list={permissions === ADMIN ? null : AssignedSessionList}
          edit={permissions === ADMIN ? null : AssignedSessionEdit}
          remove={permissions === ADMIN ? null : AssignedSessionDelete}
        />
        : undefined
    ]}
  </Admin>
);

export default App; //to autorenderer when locale changes