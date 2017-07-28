// in src/App.js
import React from 'react';
import { jsonServerRestClient, Admin, Resource} from 'admin-on-rest';

import messages from '../../i18n'

import routes from '../../routes'
import menu from '../Menu'
import layout from '../Layout'

import Dashboard from '../Dashboard';

import Sessions from '../../modules/Sessions/List';
import SessionCreate from '../../modules/Sessions/Create';

import todo from "../../data/games"

import auth from '../../utils/auth';

console.log("TODOOO", todo)

const App = () => (
    <Admin appLayout={layout} customRoutes={routes} menu={menu} authClient={auth}  dashboard={Dashboard} restClient={jsonServerRestClient('http://jsonplaceholder.typicode.com')} locale='es' messages={messages}>
        <Resource name="posts" list={Sessions} create={SessionCreate} />
        <Resource name="comments"/>
    </Admin>
);

export default App; //to autorerender when locale changes