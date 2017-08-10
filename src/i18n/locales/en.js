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
        multilanguagePicker : 'Insert value for "%{idioma}"'
    },
    others:{
        accept : "Accept",
    },
    menu: {
        configurationItem : "Configuration"
    },
    session:{
        create: {
            addGame : "Add Game"
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
        sessions: {
            name: 'Session |||| Sessions',
            fields: {
                id : 'Identifier',
                title: 'Title',
                content: 'Content'
            }
        },
        centers: {
            name: 'Center |||| Centers',
            fields: {
                id : 'Identifier',
                name: 'Name',
                description: 'Description',
                director_id: 'Centre director'
            },
        },
        therapists: {
            name: 'Therapist |||| Therapists',
            fields: {
                 id : 'Identifier',
                name: 'Name',
            },
        },
        patients: {
            name: 'Patient |||| Patients',
            fields: {
                id : 'Identifier',
                name: 'Name',
            },
        },
        directors: {
            name: 'Director |||| Directors',
            fields: {
                id : 'Identifier',
                name: 'Name',
            },
            references : {
                centersList : "Centers"
            }
        }

    },
}