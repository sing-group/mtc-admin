import messages from '@sing-group/mtc-games/src/i18n/en_US'
import {parseids} from '../../utils/parseKeys'

 export default {
    common: {
        configuration : {
            title : "Configuration",
            languageSelector: 'Language'
        },
        model : {
            games : Object.keys(messages).reduce( (accum,key) => {
                accum[parseids(key)] = messages[key]
                return accum
            }, {} )
        },
        languages : {
            es : "Spanish",
            en : "English",
            ga : "Galician"
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
                id : 'Identifier',
                name: 'Name',
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