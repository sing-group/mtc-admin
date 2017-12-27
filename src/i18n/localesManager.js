const messages = require(".").default;

const SupportedLocales = Object.keys(messages);
const DEFAULT_LOCALE = SupportedLocales[0];

export {
  SupportedLocales,
  DEFAULT_LOCALE
}