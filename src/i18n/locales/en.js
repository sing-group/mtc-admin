import messages from '@sing-group/mtc-games/src/i18n/en_US'
import {parseids} from '../../utils/parseKeys'

const   me =  {
    common: {
        configuration : {
            title : "Configuration",
            languageSelector: 'Languague'
        },
        model : {
            games : Object.keys(messages).reduce( (accum,key) => {
                accum[parseids(key)] = messages[key]
                return accum
            }, {} )
        },
        languages : {
            es_ES : "Spanish",
            en_US : "English",
            gl_ES : "Galician"
        },
        multilanguagePickerTitle : 'Languages',
        multilanguagePicker : 'Insert value for "%{idioma}"',
        invalidCredentials : 'Invalid credentials'
    },
    others:{
        accept : "Accept",
    },
    menu: {
        configurationItem : "Configuration"
    },
    session:{
        noTranslation : 'No english value',
        create: {
            addGame : "Add Game",
            endConfiguration: "Finalize"
        }
    },
    game : {
        configurer : {
            toolbar : {
                options : "Options"
            }
        },
        picker : {
            title : "Select a game",
            addGames : "Add games"
        }
    },
    resources: {
        session: {
            name: 'Session |||| Sessions',
            fields: {
                id : 'Identifier',
                title: 'Title',
                content: 'Content'
            }
        },
        institution: {
            name: 'institution |||| institutions',
            fields: {
                id : 'Identifier',
                name: 'Name',
                address: 'Address',
                description: 'Description',
                manager: 'Institution manager'
            },
        },
        therapist: {
            name: 'Therapist |||| Therapists',
            fields: {
                 id : 'Identifier',
                name: 'Name',
                institution: 'Centre'
            },
        },
        patient: {
            name: 'Patient |||| Patients',
            fields: {
                id : 'Login',
                password : 'Password',
                assignedSession : 'Assigned Sessions'
            },
            parcialEdits : {
                personalData : 'Patient Data',
                assignmentData : 'Session Assignment',
                assignmentDataEdit : 'Edit Assignments'
            }
        },
        assignedSession: {
            name: 'Assignment |||| Assignments',

            fields: {
                id : 'Identifier',
                session : 'Session',
                assignmentDate : 'Assignment Date',
                startDate : 'Session Starts',
                endDate : 'Session Ends',
                gamesSessionId : 'Session'
            },
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
            references : {
                institutionsList : "institutions"
            }
        }

    },
}

console.log("EN",me)
export default me