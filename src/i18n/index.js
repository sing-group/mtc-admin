import es_ES from './locales/es';
import gl_ES from './locales/gl';
import en_US from './locales/en';
import {englishMessages} from 'admin-on-rest';

export default {
  es_ES,
  gl_ES,
  en_US: Object.assign({}, en_US, englishMessages)
};