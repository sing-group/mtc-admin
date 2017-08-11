// in src/App.js
import React from 'react';
import { jsonServerRestClient, Resource } from 'admin-on-rest';
import { Admin } from 'aor-permissions';
import messages from '../../i18n'
import { DEFAULT_LOCALE } from '../../i18n/localesManager'

import Dashboard from '../Dashboard';

import Sessions from '../../modules/Sessions/List';
import SessionCreate from '../../modules/Sessions/Create';

import Centers from '../../modules/Centers/List';
import CenterCreate from '../../modules/Centers/Create';
import CenterShow from '../../modules/Centers/Show';
import CenterEdit from '../../modules/Centers/Edit';
import CenterDelete from '../../modules/Centers/Delete';

import Directors from '../../modules/Directors/List';
import DirectorCreate from '../../modules/Directors/Create';
import DirectorShow from '../../modules/Directors/Show';
import DirectorEdit from '../../modules/Directors/Edit';
import DirectorDelete from '../../modules/Directors/Delete';

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

import auth from '../../utils/auth';
import routes from '../../routes'
import menu from '../Menu'
import layout from '../Layout'
import login from '../../customReducers/login'

const App = () => (
    <Admin appLayout={layout} customRoutes={routes} menu={menu} customReducers={{login}} authClient={auth} dashboard={Dashboard} restClient={jsonServerRestClient('http://localhost:4000')} locale={DEFAULT_LOCALE} messages={messages}>
        <Resource
            name="directors"
            permissions="GA"
            list={Directors}
            listPermissions={["GA", "CD"]}
            create={DirectorCreate}
            show={DirectorShow}
            showPermissions={["GA", "CD"]}
            edit={DirectorEdit}
            remove={DirectorDelete} />

        <Resource
            name="centers"
            permissions={["GA", "CD"]}
            list={Centers}
            listPermissions={["GA", "CD"]}
            create={CenterCreate}
            createPermissions={["GA"]}
            show={CenterShow}
            edit={CenterEdit}
            editPermissions={["GA"]}
            remove={CenterDelete} />
        <Resource
            name="therapists"
            permissions="CD"
            list={Therapists}
            create={TherapistCreate}  
            show={TherapistShow}
            edit={TherapistEdit}
            remove={TherapistDelete} />

        <Resource
            name="sessions"
            permissions="T"
            list={Sessions}
            create={SessionCreate} />

        <Resource
            name="patients"
            permissions="T"
            list={Patients}
            create={PatientCreate}
            show={PatientShow}
            edit={PatientEdit}
            remove={PatientDelete} />
    </Admin>
);

export default App; //to autorerender when locale changes