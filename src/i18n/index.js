import es from './locales/es'
import ga from './locales/ga'
import en from './locales/en'
import { englishMessages } from 'admin-on-rest';


export default {
    ga,
    es,
    en : {
        ...en,
        ...englishMessages
    }
}