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
            title : "Select a game"
        }
    },
    resources: {
        posts: {
            name: 'Session |||| Sessions',
            fields: {
                title: 'Title',
                content: 'Content'
            },
        }

    },
}