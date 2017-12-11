import messages from '@sing-group/mtc-games/src/i18n/en_US';
import {parseids} from '../../utils/parseKeys';

const me = {
  common: {
    configuration: {
      title: "Configuration",
      languageSelector: 'Language'
    },
    model: {
      games: Object.keys(messages).reduce((accum, key) => {
        accum[parseids(key)] = messages[key];
        return accum
      }, {})
    },
    languages: {
      es_ES: "Spanish",
      en_US: "English",
      gl_ES: "Galician"
    },
    multilanguagePickerTitle: 'Languages',
    multilanguagePicker: 'Insert value for "%{language}"',
    invalidCredentials: 'Invalid credentials'
  },
  others: {
    accept: "Accept",
  },
  menu: {
    configurationItem: "Configuration"
  },
  session: {
    noTranslation: 'No English value',
    create: {
      addGame: "Add Game",
      endConfiguration: "Finalize"
    }
  },
  game: {
    configurer: {
      toolbar: {
        options: "Options"
      }
    },
    picker: {
      title: "Select a game",
      addGames: "Add games"
    }
  },
  resources: {
    session: {
      name: 'Session |||| Sessions',
      fields: {
        id: 'Identifier',
        title: 'Title',
        content: 'Content'
      }
    },
    institution: {
      name: 'Institution |||| Institutions',
      fields: {
        id: 'Identifier',
        name: 'Name',
        address: 'Address',
        description: 'Description',
        manager: 'Institution manager'
      }
    },
    therapist: {
      name: 'Therapist |||| Therapists',
      fields: {
        name: 'Name',
        surname: 'Surname',
        password: 'Password',
        login: 'Login',
        email: 'Email',
        institution: 'Center'
      }
    },
    patient: {
      name: 'Patient |||| Patients',
      fields: {
        id: 'Login',
        password: 'Password',
        assignedSession: 'Assigned Sessions'
      },
      partialEdits: {
        personalData: 'Patient Data',
        assignmentData: 'Session Assignment',
        assignmentDataEdit: 'Edit Assignments'
      }
    },
    assignedSession: {
      name: 'Assignment |||| Assignments',
      fields: {
        id: 'Identifier',
        session: 'Session',
        assignmentDate: 'Assignment Date',
        startDate: 'Session Starts',
        endDate: 'Session Ends',
        gamesSessionId: 'Session'
      }
    },
    manager: {
      name: 'Manager |||| Managers',
      fields: {
        name: 'Name',
        surname: 'Surname',
        password: 'Password',
        login: 'Login',
        email: 'Email'
      },
      references: {
        institutionsList: "institutions"
      }
    }
  }
};

export default me