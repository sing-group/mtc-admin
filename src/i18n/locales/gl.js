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
import messages from "@sing-group/mtc-games/src/i18n/gl_ES";
import {parseids} from "../../utils/parseKeys";

const gl_ES = {
  common: {
    configuration: {
      title: "Opcións",
      languageSelector: "Linguaxe"
    },
    model: {
      games: Object.keys(messages).reduce((accum, key) => {
        accum[parseids(key)] = messages[key];
        return accum;
      }, {}),
      validation: {
        invalidValue: "Valor non válido"
      }
    },
    languages: {
      es_ES: "Español",
      en_US: "Inglés",
      gl_ES: "Galego"
    },
    dateLocales: "es-ES",
    multilanguagePickerTitle: "Linguaxes",
    multilanguagePicker: 'Introduce o valor para "%{language}"',
    invalidCredentials: "Usuario non válido",
    invalidRole: "Usuario non válido",
    noCredentialsInLocalStorage: "Non se atoparon credenciais válidas no almacenamento local",
    "true": "Si",
    "false": "Non"
  },
  others: {
    accept: "Aceptar",
  },
  configuration: {
    title: "Configuración",
    language: "Linguaxe",
    theme: {
      name: "Tema",
      light: "Claro",
      dark: "Escuro"
    }
  },
  menu: {
    configurationItem: "Configuración"
  },
  dashboard: {
    title: "Benvido a MTC Admin",
    description: {
      admin: "Esta é a páxina de administración de MTC. No menú lateral atoparás as seguintes opcións:\n" +
      "\n" +
      "* **Panel de control**: volver a esta páxina.\n" +
      "* **Directores**: listaxe cos directores dos teus centros. Poderás xestionar os directores, creando novos directores ou editando os xa existentes.\n" +
      "* **Centros**: listaxe cos teus centros. Poderás xestionar os teus centros, creando novos centros ou editando os xa existentes. Isto inclúe a asignación de directores a centros.\n" +
      "* **Configuración**: aquí poderás cambiar o idioma da aplicación ou o seu estilo.\n" +
      "* **Pechar sesión**: pecha a sesión actual. É recomendable facelo cando finalices o traballo coa aplicación.",
      manager: "Esta é a páxina de administración de MTC. No menú lateral atoparás as seguintes opcións:\n" +
      "\n" +
      "* **Panel de control**: volver a esta páxina.\n" +
      "* **Centros**: listaxe cos teus centros. Poderás ver os datos dos centros que dirixes.\n" +
      "* **Terapeutas**: listaxe cos terapeutas dos teus centros. Poderás xestionar os terapeutas, creando novos terapeutas ou editando os xa existentes.\n" +
      "* **Configuración**: aquí poderás cambiar o idioma da aplicación ou o seu estilo.\n" +
      "* **Pechar sesión**: pecha a sesión actual. É recomendable facelo cando finalices o traballo coa aplicación.",
      therapist: "Esta é a páxina de administración de MTC. No menú lateral atoparás as seguintes opcións:\n" +
      "\n" +
      "* **Panel de control**: volver a esta páxina.\n" +
      "* **Pacientes**: listaxe cos teus pacientes. Poderás editar os datos dos pacientes ou acceder ás sesións de xogos que teñen asignadas.\n" +
      "* **Sesións**: listaxe coas túas sesións de xogos. Poderás xestionar estas sesións, creando novas ou modificando as xa existentes.\n" +
      "* **Asignacións**: listaxe con todas as sesións de xogos asignadas a pacientes. Poderás filtralas por paciente.\n" +
      "* **Configuración**: aquí poderás cambiar o idioma da aplicación ou o seu estilo.\n" +
      "* **Pechar sesión**: pecha a sesión actual. É recomendable facelo cando finalices o traballo coa aplicación."
    }
  },
  session: {
    noTranslation: "Sen valor en galego",
    create: {
      addGame: "Engadir xogo",
      endConfiguration: "Rematar"
    }
  },
  game: {
    configurator: {
      toolbar: {
        options: "Opcións"
      }
    },
    picker: {
      title: "Escolla un xogo",
      addGames: "Engadir xogos"
    }
  },
  resources: {
    "games-session": {
      name: "Sesión |||| Sesións",
      fields: {
        id: "Identificador",
        title: "Título",
        content: "Contido"
      }
    },
    institution: {
      name: "Centro |||| Centros",
      fields: {
        id: "Identificador",
        name: "Nome",
        address: "Dirección",
        description: "Descrición",
        manager: "Director do centro"
      }
    },
    therapist: {
      name: "Terapeuta |||| Terapeutas",
      fields: {
        name: "Nome",
        surname: "Apelidos",
        password: "Clave",
        login: "Login",
        email: "Correo electrónico",
        institution: "Centro"
      }
    },
    patient: {
      name: "Paciente |||| Pacientes",
      fields: {
        id: "Login",
        password: "Contrasinal",
        "assigned-session": "Sesións Asignadas"
      },
      partialEdits: {
        personalData: "Datos do paciente",
        assignmentData: "Asignación das sesións",
        assignmentDataView: "Ver Asignacións"
      }
    },
    "assigned-session": {
      name: "Asignación |||| Asignacións",
      fields: {
        id: "Identificador",
        session: "Sesión",
        assignmentDate: "Data de asignación",
        startDate: "Comezo da sesión",
        endDate: "Finalización de sesión",
        assignedGamesSessions: "Sesión",
        patient: "Paciente"
      }
    },
    "game-result": {
      fields: {
        game: "Xogo",
        gameIndex: "Orde",
        attempt: "Intento",
        startDate: "Inicio",
        endDate: "Fin",
        guessed: "Acertos",
        failed: "Fallos",
        gameCompleted: "Completo",
        totalTries: "Intentos",
        totalAttempts: "Palabras probadas",
        repeatedGuesses: "Palabras repetidas",
        totalGuessedWords: "Total palabras válidas",
        guessedWords: "Palabras válidas"
      }
    },
    manager: {
      name: "Director |||| Directores",
      fields: {
        name: "Nome",
        surname: "Apelidos",
        password: "Clave",
        login: "Login",
        email: "Correo electrónico"
      },
      references: {
        institutionsList: "Centros Asociados"
      }
    }
  },
  aor: {
    action: {
      delete: "Eliminar",
      show: "Amosar",
      list: "Listar",
      save: "Gardar",
      cancel: "Cancelar",
      create: "Crear",
      edit: "Editar",
      refresh: "Actualizar",
      add_filter: "Engadir filtro",
      remove_filter: "Eliminar filtro",
      back: "Atrás"
    },
    boolean: {
      true: "Sí",
      false: "Non",
    },
    page: {
      list: "Listaxe de %{name}",
      edit: "Editar %{name}",
      show: "Datos %{name}",
      create: "Engadir %{name}",
      delete: "Eliminar %{name}",
      dashboard: "Panel de control",
      not_found: "Páxina non atopada"
    },
    input: {
      image: {
        upload_several: "Solte algúns arquivos para cargar ou faga clic para seleccionar un.",
        upload_single: "Solte un arquivo para cargalo ou faga clic para seleccionalo.",
      }
    },
    message: {
      yes: "Sí",
      no: "Non",
      are_you_sure: "Está seguro?",
      not_found: "Non se atopa o elemento",
      about: "Acerca de",
    },
    navigation: {
      no_results: "Non se atoparon resultados",
      page_out_of_boundaries: "A páxina %{page} está fora do límite",
      page_out_from_end: "Non se pode ir despois da última páxina",
      page_out_from_begin: "Non se pode ir antes da primera páxina",
      page_range_info: "%{offsetBegin}-%{offsetEnd} de %{total}",
      next: "Seguinte",
      prev: "Anterior",
    },
    auth: {
      username: "Usuario",
      password: "Contrasinal",
      sign_in: "Entrar",
      sign_in_error: "Produciuse un erro na autenticación.",
      logout: "Pechar sesión",
    },
    notification: {
      updated: "Elemento actualizado",
      created: "Elemento creado",
      deleted: "Elemento eliminado",
      item_doesnt_exist: "O elemento non existe",
    },
    validation: {
      required: "Requirido",
      email: "O formato do email non e válido",
      minLength: "Debe ter %{min} caracteres como mínimo",
      maxLength: "Debe ter %{max} caracteres como máximo",
      minValue: "Mínimo %{min}",
      maxValue: "Máximo %{max}",
    }
  }
};

export default gl_ES;
