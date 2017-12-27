import {SupportedLocales} from "../localesManager";


const Logos = {};

SupportedLocales.map(locale => Logos[locale] = require(`./${locale}.png`));

export {Logos}
