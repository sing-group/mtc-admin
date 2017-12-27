import React from 'react';
import {Admin, Resource} from 'admin-on-rest';
import messages from '../../i18n';
import {DEFAULT_LOCALE} from '../../i18n/localesManager';

import CustomLayout from '../Layout';

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
import SessionDelete from '../operations/sessions/Delete';

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

import {ADMIN, MANAGER, THERAPIST} from '../../controllers/AuthController';

import routes from '../../routes';
import menu from '../Menu';
import actionLoggerReducer from '../../reducers/actionLogger';
import contextReducer from '../../reducers/context';
import themeReducer from '../../reducers/themeReducer';
import ApiController from "../../controllers/ApiController";

import {API_URL} from '../../config';
import InstitutionEndpointFactory from "../../data/endpoints/factories/InstitutionEndpointFactory";
import RequestAdapters from "../../controllers/request_adapters/RequestAdapters";
import DEFAULT_RESPONSE_ADAPTERS from "../../controllers/response_adapters/DefaultResponseAdapters";
import ManagerEndpointFactory from "../../data/endpoints/factories/ManagerEndpointFactory";
import InstitutionGetManyReferenceRequestAdapter from "../../controllers/request_adapters/institution/InstitutionGetManyReferenceRequestAdapter";
import InstitutionListByManagerResponseAdapter from "../../controllers/response_adapters/institution/InstitutionListByManagerResponseAdapter";
import InstitutionParamsMapper from "../../controllers/request_adapters/mappers/InstitutionParamsMapper";
import ManagerParamsMapper from "../../controllers/request_adapters/mappers/ManagerParamsMapper";
import TherapistEndpointFactory from "../../data/endpoints/factories/TherapistEndpointFactory";
import TherapistParamsMapper from "../../controllers/request_adapters/mappers/TherapistParamsMapper";
import PatientEndpointFactory from "../../data/endpoints/factories/PatientEndpointFactory";
import PatientParamsMapper from "../../controllers/request_adapters/mappers/PatientParamsMapper";
import AssignedGamesSessionEndpointFactory from "../../data/endpoints/factories/AssignedGamesSessionEndpointFactory";
import InstitutionGetListReferenceRequestAdapter from "../../controllers/request_adapters/institution/InstitutionGetListRequestAdapter";
import InstitutionGetListResponseAdapter from "../../controllers/response_adapters/institution/InstitutionGetListResponseAdapter";
import GamesSessionEndpointFactory from "../../data/endpoints/factories/GamesSessionEndpointFactory";
import GamesSessionParamsMapper from "../../controllers/request_adapters/mappers/GamesSessionParamsMapper";
import GamesSessionGetListReferenceRequestAdapter from "../../controllers/request_adapters/games_session/GamesSessionGetListRequestAdapter";
import GamesSessionCreateRequestAdapter from "../../controllers/request_adapters/games_session/GamesSessionCreateRequestAdapter";
import AssignedGamesSessionParamsMapper from "../../controllers/request_adapters/mappers/AssignedGamesSessionParamsMapper";
import AssignedSessionCreateRequestAdapter from "../../controllers/request_adapters/assigned_session/AssignedSessionCreateRequestAdapter";
import AssignedSessionUpdateRequestAdapter from "../../controllers/request_adapters/assigned_session/AssignedSessionUpdateRequestAdapter";
import AssignedSessionGetListRequestAdapter from "../../controllers/request_adapters/assigned_session/AssignedSessionGetListRequestAdapter";
import AssignedSessionGetManyRequestAdapter from "../../controllers/request_adapters/assigned_session/AssignedSessionGetManyRequestAdapter";
import AssignedSessionListByPatientResponseAdapter from "../../controllers/response_adapters/assigned_session/AssignedSessionListByPatientResponseAdapter";
import AuthController from "../../controllers/AuthController";

const institutionParamsMapper = new InstitutionParamsMapper();
const gamesSessionParamsMapper = new GamesSessionParamsMapper();
const assignedGamesSessionParamsMapper = new AssignedGamesSessionParamsMapper();

const authController = new AuthController(API_URL);
const auth  = authController.manageAuthenticationAction.bind(authController);
const loginReducer = authController.buildLoginReducer();

const endpointFactories = {
  institution: new InstitutionEndpointFactory(
    API_URL,
    RequestAdapters.buildFor(
      institutionParamsMapper,
      {
        GET_MANY_REFERENCE: new InstitutionGetManyReferenceRequestAdapter(),
        GET_LIST: new InstitutionGetListReferenceRequestAdapter(
          paramName => institutionParamsMapper.convertParamName(paramName), authController
        )
      }
    ),
    Object.assign({}, DEFAULT_RESPONSE_ADAPTERS,
      {
        GET_MANY_REFERENCE: new InstitutionListByManagerResponseAdapter(),
        GET_LIST: new InstitutionGetListResponseAdapter(authController)
      }
    )
  ),
  manager: new ManagerEndpointFactory(API_URL,
    RequestAdapters.buildFor(new ManagerParamsMapper()),
    DEFAULT_RESPONSE_ADAPTERS
  ),
  therapist: new TherapistEndpointFactory(API_URL,
    RequestAdapters.buildFor(new TherapistParamsMapper()),
    DEFAULT_RESPONSE_ADAPTERS
  ),
  patient: new PatientEndpointFactory(API_URL,
    RequestAdapters.buildFor(new PatientParamsMapper()),
    DEFAULT_RESPONSE_ADAPTERS
  ),
  "assigned-session": new AssignedGamesSessionEndpointFactory(
    API_URL,
    RequestAdapters.buildFor(
      assignedGamesSessionParamsMapper,
      {
        CREATE: new AssignedSessionCreateRequestAdapter(
          params => assignedGamesSessionParamsMapper.convertParamsToData(params), authController
        ),
        UPDATE: new AssignedSessionUpdateRequestAdapter(
          params => assignedGamesSessionParamsMapper.convertParamsToIdAndData(params), authController
        ),
        GET_LIST: new AssignedSessionGetListRequestAdapter(
          params => assignedGamesSessionParamsMapper.convertParamName(params)
        ),
        GET_MANY_REFERENCE: new AssignedSessionGetManyRequestAdapter(
          params => assignedGamesSessionParamsMapper.convertParamName(params)
        )
      }
    ),
    Object.assign({}, DEFAULT_RESPONSE_ADAPTERS,
      {
        GET_MANY_REFERENCE: new AssignedSessionListByPatientResponseAdapter()
      }
    )
  ),
  "games-session": new GamesSessionEndpointFactory(
    API_URL,
    RequestAdapters.buildFor(
      gamesSessionParamsMapper,
      {
        CREATE: new GamesSessionCreateRequestAdapter(
          params => gamesSessionParamsMapper.convertParamsToData(params), authController
        ),
        GET_LIST: new GamesSessionGetListReferenceRequestAdapter(
          paramName => gamesSessionParamsMapper.convertParamName(paramName), authController
        )
      }
    ),
    DEFAULT_RESPONSE_ADAPTERS
  )
};

const apiController = new ApiController(endpointFactories, authController);
const restClient = apiController.manageRequest.bind(apiController);

const App = () => (
  <Admin title="MTC Admin"
         customRoutes={routes}
         menu={menu}
         customReducers={{
           login: loginReducer,
           context: contextReducer,
           actionLogger: actionLoggerReducer,
           theme: themeReducer
         }}
         authClient={auth}
         dashboard={Dashboard}
         restClient={restClient}
         locale={DEFAULT_LOCALE}
         messages={messages}
         appLayout={CustomLayout}
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
          name="games-session"
          icon={SessionIcon}
          list={Sessions}
          edit={SessionEdit}
          create={permissions === ADMIN ? null : SessionCreate}
          remove={SessionDelete}/>
        : undefined,
      permissions === THERAPIST ?
        <Resource
          name="assigned-session"
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