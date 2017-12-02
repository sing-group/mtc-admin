// in src/App.js
import React from 'react';
import { jsonServerRestClient, Resource, Admin, Delete } from 'admin-on-rest';
import messages from '../../i18n'
import { DEFAULT_LOCALE } from '../../i18n/localesManager'

import Dashboard from '../Dashboard';

import Sessions from '../../modules/Sessions/List';
import SessionCreate from '../../modules/Sessions/Create';
import SessionEdit from '../../modules/Sessions/Edit';

import Institutions from '../../modules/Institutions/List';
import InstitutionCreate from '../../modules/Institutions/Create';
import InstitutionShow from '../../modules/Institutions/Show';
import InstitutionEdit from '../../modules/Institutions/Edit';
import InstitutionDelete from '../../modules/Institutions/Delete';

import Managers from '../../modules/Managers/List';
import ManagerCreate from '../../modules/Managers/Create';
import ManagerShow from '../../modules/Managers/Show';
import ManagerEdit from '../../modules/Managers/Edit';
import ManagerDelete from '../../modules/Managers/Delete';

import Therapists from '../../modules/Therapists/List';
import TherapistCreate from '../../modules/Therapists/Create';
import TherapistShow from '../../modules/Therapists/Show';
import TherapistEdit from '../../modules/Therapists/Edit';
import TherapistDelete from '../../modules/Therapists/Delete';

import Patients from '../../modules/Patients/List';
import PatientCreate from '../../modules/Patients/Create';
import PatientShow from '../../modules/Patients/Show';
import PatientEdit from '../../modules/Patients/Edit';
import PatientDelete from '../../modules/Patients/Delete';
import PatientSagas from '../../modules/Patients/Sagas';

import AssignedSessionCreate from '../../modules/AssignedSessions/Create';
import AssignedSessionDelete from '../../modules/AssignedSessions/Delete';
import AssignedSessionList from '../../modules/AssignedSessions/List';
import AssignedSessionEdit from '../../modules/AssignedSessions/Edit';

import {ADMIN,MANAGER,THERAPIST} from '../../customControllers/PermissionsController'

import auth from '../../customControllers/AuthController';
import ApiClient from '../../customControllers/ApiController';
import routes from '../../routes'
import menu from '../Menu'
import layout from '../Layout'
import login from '../../customReducers/login'
import actionLogger from '../../customReducers/actionLogger'
import context from '../../customReducers/context'
import patientsSaga from '../../modules/Patients/Sagas';

const App = () => (
    <Admin /*appLayout={layout}*/ customRoutes={routes} customSagas={[PatientSagas]} menu={menu}  customReducers={{ login,context, actionLogger  }} authClient={auth} dashboard={Dashboard} restClient={ApiClient(/*Url string param HERE overrides the API_URL in config.js*/)} locale={DEFAULT_LOCALE} messages={messages}>
        {permissions => [
            permissions === ADMIN ?
                <Resource
                    name="manager"
                    list={permissions === ADMIN || permissions === MANAGER ? Managers : null}
                    create={ManagerCreate}
                    show={permissions === ADMIN || permissions === MANAGER ? ManagerShow : null}
                    edit={permissions === ADMIN || permissions === MANAGER ? ManagerEdit : null}
                    remove={ManagerDelete} />

                : undefined,
            permissions === ADMIN || permissions === MANAGER?
                <Resource
                    name="institution"
                    list={permissions === ADMIN|| permissions === MANAGER ? Institutions : null}
                    create={permissions === ADMIN? InstitutionCreate : null}
                    show={InstitutionShow}
                    edit={permissions === ADMIN  ? InstitutionEdit : null}
                    remove={InstitutionDelete} />
                : undefined,
                 permissions === MANAGER ?
                <Resource
                    name="therapist"
                    list={Therapists}
                    create={permissions === ADMIN?  null : TherapistCreate}
                    show={TherapistShow}
                    edit={permissions === ADMIN ?  null : TherapistEdit}
                    remove={permissions === ADMIN ? null : TherapistDelete} />
                : undefined,
                permissions === THERAPIST ?
                <Resource
                    name="session"
                    list={Sessions}
                    edit={SessionEdit}
                    create={permissions === ADMIN ?  null : SessionCreate} />
                : undefined,
                permissions === THERAPIST ?
                <Resource
                    name="patient"
                    list={Patients}
                    create={permissions === ADMIN?  null : PatientCreate}
                    //show={PatientShow}
                    edit={permissions === ADMIN ?  null : PatientEdit}
                    remove={permissions === ADMIN ?  null : PatientDelete} />
                : undefined,
                permissions === THERAPIST ?
                <Resource
                    name="assignedSession"
                    create={permissions === ADMIN ?  null : AssignedSessionCreate}

                    showList={false}
                    list={permissions === ADMIN ?  null : AssignedSessionList}
                    edit={permissions === ADMIN ?  null : AssignedSessionEdit}
                    remove={permissions === ADMIN ?  null : AssignedSessionDelete}
                   />
                : undefined
        ]}
    </Admin>
);

export default App; //to autorerender when locale changes