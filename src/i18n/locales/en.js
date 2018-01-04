/*
 * MultiTasking Cubes Administration
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Francisco Rojas Rodríguez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 * Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 * Carlos Spuch Calvar, and Tania Rivera Baltanás
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import messages from "@sing-group/mtc-games/src/i18n/en_US";
import {parseids} from "../../utils/parseKeys";

const en_US = {
  common: {
    configuration: {
      title: "Configuration",
      languageSelector: "Language"
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
    dateLocales: "en-US",
    multilanguagePickerTitle: "Languages",
    multilanguagePicker: 'Insert value for "%{language}"',
    invalidCredentials: "Invalid credentials",
    noCredentialsInLocalStorage: "No valid user credentials found in local storage"
  },
  others: {
    accept: "Accept",
  },
  configuration: {
    title: "Configuration",
    language: "Language",
    theme: {
      name: "Theme",
      light: "Light",
      dark: "Dark"
    }
  },
  menu: {
    configurationItem: "Configuration"
  },
  session: {
    noTranslation: "No English value",
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
    "games-session": {
      name: "Session |||| Sessions",
      fields: {
        id: "Identifier",
        title: "Title",
        content: "Content"
      }
    },
    institution: {
      name: "Institution |||| Institutions",
      fields: {
        id: "Identifier",
        name: "Name",
        address: "Address",
        description: "Description",
        manager: "Institution manager"
      }
    },
    therapist: {
      name: "Therapist |||| Therapists",
      fields: {
        name: "Name",
        surname: "Surname",
        password: "Password",
        login: "Login",
        email: "Email",
        institution: "Center"
      }
    },
    patient: {
      name: "Patient |||| Patients",
      fields: {
        id: "Login",
        password: "Password",
        "assigned-session": "Assigned sessions"
      },
      partialEdits: {
        personalData: "Patient Data",
        assignmentData: "Session Assignment",
        assignmentDataView: "View Assignments"
      }
    },
    "assigned-session": {
      name: "Assignment |||| Assignments",
      fields: {
        id: "Identifier",
        session: "Session",
        assignmentDate: "Assignment Date",
        startDate: "Session Starts",
        endDate: "Session Ends",
        assignedGamesSessions: "Session",
        patient: "Patient"
      }
    },
    manager: {
      name: "Manager |||| Managers",
      fields: {
        name: "Name",
        surname: "Surname",
        password: "Password",
        login: "Login",
        email: "Email"
      },
      references: {
        institutionsList: "institutions"
      }
    }
  }
};

export default en_US;
