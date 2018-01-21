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
import messages from "@sing-group/mtc-games/src/i18n/es_ES"
import {parseids} from "../../utils/parseKeys"


const es_ES = {
  common: {
    configuration: {
      title: "Configuración",
      languageSelector: "Idioma"
    },
    model: {
      games: Object.keys(messages).reduce((accum, key) => {
        accum[parseids(key)] = messages[key];
        return accum;
      }, {}),
      validation: {
        invalidValue: "Valor no válido"
      }
    },
    languages: {
      es_ES: "Español",
      en_US: "Inglés",
      gl_ES: "Gallego"
    },
    dateLocales: "es-ES",
    multilanguagePickerTitle: "Idiomas",
    multilanguagePicker: 'Introduce valor para "%{language}"',
    invalidCredentials: "Usuario no válido",
    invalidRole: "Usuario no válido",
    noCredentialsInLocalStorage: "No se han encontrado credenciales válidas en el almacenamiento local",
    "true": "Sí",
    "false": "No"
  },
  others: {
    accept: "Aceptar",
  },
  configuration: {
    title: "Configuración",
    language: "Lenguaje",
    theme: {
      name: "Tema",
      light: "Claro",
      dark: "Oscuro"
    }
  },
  menu: {
    configurationItem: "Configuración"
  },
  dashboard: {
    title: "Bienvenido a MTC Admin",
    description: {
      admin: "Esta es la página de administración de MTC. En el menú lateral encontrará las siguientes opciones:\n" +
             "\n" +
             "* **Panel de control**: volver a esta página.\n" +
             "* **Directores**: listado con los directores de tus centros. Podrás gestionar los directores, creando nuevos directores o editando los ya existentes.\n" +
             "* **Centros**: listado con tus centros. Podrás gestionar tus centros, creando nuevos centros o editando los ya existentes. Esto incluye la asignación de directores a centros.\n" +
             "* **Configuración**: aquí podrás cambiar el idioma de la aplicación o su estilo.\n" +
             "* **Cerrar sesión**: cierra la sesión actual. Es recomendable hacerlo cuando finalices el trabajo con la aplicación.",
      manager: "Esta es la página de administración de MTC. En el menú lateral encontrará las siguientes opciones:\n" +
               "\n" +
               "* **Panel de control**: volver a esta página.\n" +
               "* **Centros**: listado con tus centros. Podrás ver los datos de los centros que diriges.\n" +
               "* **Terapeutas**: listado con los terapeutas de tus centros. Podrás gestionar los terapeutas, creando nuevos terapeutas o editando los ya existentes.\n" +
               "* **Configuración**: aquí podrás cambiar el idioma de la aplicación o su estilo.\n" +
               "* **Cerrar sesión**: cierra la sesión actual. Es recomendable hacerlo cuando finalices el trabajo con la aplicación.",
      therapist: "Esta es la página de administración de MTC. En el menú lateral encontrará las siguientes opciones:\n" +
                 "\n" +
                 "* **Panel de control**: volver a esta página.\n" +
                 "* **Pacientes**: listado con tus pacientes. Podrás editar los datos de los pacientes o acceder a las sesiones de juegos que tienen asignadas.\n" +
                 "* **Sesiones**: listado con tus sesiones de juegos. Podrás gestionar estas sesiones, creando nuevas o modificando las ya existentes.\n" +
                 "* **Asignaciones**: listado con todas las sesiones de juegos asignadas a pacientes. Podrás filtrarlas por paciente.\n" +
                 "* **Configuración**: aquí podrás cambiar el idioma de la aplicación o su estilo.\n" +
                 "* **Cerrar sesión**: cierra la sesión actual. Es recomendable hacerlo cuando finalices el trabajo con la aplicación."
    }
  },
  session: {
    noTranslation: "Sin valor en español",
    create: {
      addGame: "Añadir juego",
      endConfiguration: "Finalizar configuración"
    }
  },
  game: {
    configurer: {
      toolbar: {
        options: "Opciones"
      }
    },
    picker: {
      title: "Selecciona un juego",
      addGames: "Añadir juegos"
    }
  },
  resources: {
    "games-session": {
      name: "Sesión |||| Sesiones",
      fields: {
        title: "Título",
        content: "Contenido"
      }
    },
    institution: {
      name: "Centro |||| Centros",
      fields: {
        id: "Identificador",
        name: "Nombre",
        address: "Dirección",
        description: "Descripción",
        manager: "Director del centro"
      }
    },
    therapist: {
      name: "Terapeuta |||| Terapeutas",
      fields: {
        name: "Nombre",
        surname: "Apellidos",
        password: "Contraseña",
        login: "Login",
        email: "Correo electrónico",
        institution: "Centro"
      }
    },
    patient: {
      name: "Paciente |||| Pacientes",

      fields: {
        id: "Login",
        password: "Contraseña",
        "assigned-session": "Sesiones Asignadas"
      },
      partialEdits: {
        personalData: "Datos paciente",
        assignmentData: "Asignacion Sesiones",
        assignmentDataView: "Ver Asiganciones"
      }
    },
    "assigned-session": {
      name: "Asignación |||| Asignaciones",
      fields: {
        id: "Identificador",
        session: "Sesión",
        assignmentDate: "Fecha de asignación",
        startDate: "Comienzo de sesión",
        endDate: "Finalización de sesión",
        assignedGamesSessions: "Sesión",
        patient: "Paciente"
      }
    },
    "game-result": {
      fields: {
        game: "Juego",
        gameIndex: "Orden",
        attempt: "Intento",
        startDate: "Inicio",
        endDate: "Fin",
        guessed: "Aciertos",
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
        name: "Nombre",
        surname: "Apellidos",
        password: "Contraseña",
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
      show: "Mostrar",
      list: "Listar",
      save: "Guardar",
      cancel: "Cancelar",
      create: "Crear",
      edit: "Editar",
      refresh: "Actualizar",
      add_filter: "Añadir filtro",
      remove_filter: "Eliminar filtro",
      back: "Atrás"
    },
    boolean: {
      true: "Sí",
      false: "No",
    },
    page: {
      list: "Listar %{name}",
      edit: "Editar %{name}",
      show: "Datos %{name}",
      create: "Crear %{name}",
      delete: "Eliminar %{name}",
      dashboard: "Panel de control",
      not_found: "Página no encontrada"
    },
    input: {
      image: {
        upload_several: "Suelte algunos archivos para cargar o haga clic para seleccionar uno.",
        upload_single: "Suelte un archivo para cargarlo o haga clic para seleccionarlo.",
      }
    },
    message: {
      yes: "Sí",
      no: "No",
      are_you_sure: "¿Estás seguro?",
      not_found: "No se encuentra el elemento",
      about: "Acerca de",
    },
    navigation: {
      no_results: "No se encontraron resultados",
      page_out_of_boundaries: "La página %{page} está fuera del límite",
      page_out_from_end: "No se puede ir después de la última página",
      page_out_from_begin: "No se puede ir antes de la página 1",
      page_range_info: "%{offsetBegin}-%{offsetEnd} de %{total}",
      next: "Siguiente",
      prev: "Anterior",
    },
    auth: {
      username: "Usuario",
      password: "Contraseña",
      sign_in: "Ingresar",
      sign_in_error: "Se ha producido un error en la autenticación.",
      logout: "Cerrar sesión",
    },
    notification: {
      updated: "Elemento actualizado",
      created: "Elemento creado",
      deleted: "Elemento eliminado",
      item_doesnt_exist: "El elemento no existe",
    },
    validation: {
      required: "Requerido",
      email: "Formato no válido",
      minLength: "Debe tener %{min} caracteres como mínimo",
      maxLength: "Debe tener %{max} caracteres como máximo",
      minValue: "Mínimo %{min}",
      maxValue: "Máximo %{max}",
    }
  }
};

export default es_ES;
