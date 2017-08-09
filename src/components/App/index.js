// in src/App.js
import React from 'react';
import { jsonServerRestClient, Resource} from 'admin-on-rest';
import { Admin } from 'aor-permissions';
import messages from '../../i18n'
import {DEFAULT_LOCALE} from '../../i18n/localesManager'
import routes from '../../routes'
import menu from '../Menu'
import layout from '../Layout'

import Dashboard from '../Dashboard';

import Sessions from '../../modules/Sessions/List';
import SessionCreate from '../../modules/Sessions/Create';

import Centers from '../../modules/Centers/List';
import CenterCreate from '../../modules/Centers/Create';

import Directors from '../../modules/Directors/List';
import DirectorCreate from '../../modules/Directors/Create';
import DirectorShow from '../../modules/Directors/Show';

import Therapists from '../../modules/Therapists/List';
import TherapistCreate from '../../modules/Therapists/Create';

import Patients from '../../modules/Patients/List';
import PatientCreate from '../../modules/Patients/Create';

import auth from '../../utils/auth';
import {resolveAccess} from '../../utils/permissions'

const App = () => (
    <Admin appLayout={layout} customRoutes={routes} menu={menu} authClient={auth}  dashboard={Dashboard} restClient={jsonServerRestClient('http://localhost:4000')} locale={DEFAULT_LOCALE} messages={messages}>
        <Resource 
            name="centers" 
            permissions="GA"
            resolve={resolveAccess}
            list={Centers} 
            create={CenterCreate} />

        <Resource 
            name="directors" 
            permissions="GA"
            resolve={resolveAccess}
            list={Directors} 
            create={DirectorCreate} 
            show={DirectorShow}/>

        <Resource 
            name="terapists" 
            permissions="CD"
            resolve={resolveAccess}
            list={Therapists} 
            create={TherapistCreate} />

        <Resource 
            name="sessions" 
            permissions="T"
            resolve={resolveAccess}
            list={Sessions} 
            create={SessionCreate} />

         <Resource 
            name="patients" 
            permissions="T"
            resolve={resolveAccess}
            list={Patients} 
            create={PatientCreate} />
    </Admin>
);

export default App; //to autorerender when locale changes