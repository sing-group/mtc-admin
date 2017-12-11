import messages from '@sing-group/mtc-games/src/i18n/gl_ES';
import {parseids} from '../../utils/parseKeys';

const me = {
  common: {
    configuration: {
      title: "Opcións",
      languageSelector: 'Linguaxe'
    },
    model: {
      games: Object.keys(messages).reduce((accum, key) => {
        accum[parseids(key)] = messages[key];
        return accum
      }, {})
    },
    languages: {
      es_ES: "Español",
      en_US: "Inglés",
      gl_ES: "Galego"
    },
    multilanguagePickerTitle: 'Linguaxes',
    multilanguagePicker: 'Introduce o valor para "%{language}"',
    invalidCredentials: 'Usuario non válido'
  },
  others: {
    accept: "Aceptar",
  },
  menu: {
    configurationItem: "Opcións"
  },
  session: {
    noTranslation: 'Sen valor en galego',
    create: {
      addGame: "Engadir xogo",
      endConfiguration: "Rematar"
    }
  },
  game: {
    configurer: {
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
    session: {
      name: 'Sesión |||| Sesións',
      fields: {
        id: 'Identificador',
        title: 'Título',
        content: 'Contido'
      }
    },
    institution: {
      name: 'Centro |||| Centros',
      fields: {
        id: 'Identificador',
        name: 'Nome',
        address: 'Dirección',
        description: 'Descrición',
        manager: 'Director do centro'
      }
    },
    therapist: {
      name: 'Terapeuta |||| Terapeutas',
      fields: {
        name: 'Nome',
        surname: 'Apelidos',
        password: 'Clave',
        login: 'Login',
        email: 'Correo electrónico',
        institution: 'Centro'
      }
    },
    patient: {
      name: 'Paciente |||| Pacientes',
      fields: {
        id: 'Login',
        password: 'Contrasinal',
        assignedSession: 'Sesións Asignadas',
        assignmentDataEdit: 'Editar Asignacións'
      },
      partialEdits: {
        personalData: 'Datos do paciente',
        assignmentData: 'Asignación das sesións',
        assignmentDataEdit: 'Editar Asignacións'
      }
    },
    assignedSession: {
      name: 'Asignación |||| Asignacións',
      fields: {
        id: 'Identificador',
        session: 'Sesión',
        assignmentDate: 'Data de asignación',
        startDate: 'Comezo da sesión',
        endDate: 'Finalización de sesión',
        gamesSessionId: 'Sesión'
      }
    },
    manager: {
      name: 'Director |||| Directores',
      fields: {
        name: 'Nome',
        surname: 'Apelidos',
        password: 'Clave',
        login: 'Login',
        email: 'Correo electrónico'
      },
      references: {
        institutionsList: "Centros Asociados"
      }
    }
  },
  aor: {
    action: {
      delete: 'Eliminar',
      show: 'Amosar',
      list: 'Listar',
      save: 'Gardar',
      cancel: 'Cancelar',
      create: 'Crear',
      edit: 'Editar',
      refresh: 'Actualizar',
      add_filter: 'Engadir filtro',
      remove_filter: 'Eliminar filtro',
      back: 'Atrás'
    },
    boolean: {
      true: 'Sí',
      false: 'Non',
    },
    page: {
      list: 'Listaxe de %{name}',
      edit: 'Editar %{name}',
      show: 'Datos %{name}',
      create: 'Engadir %{name}',
      delete: 'Eliminar %{name}',
      dashboard: 'Panel de control',
      not_found: 'Páxina non atopada'
    },
    input: {
      image: {
        upload_several: 'Solte algúns arquivos para cargar ou faga clic para seleccionar un.',
        upload_single: 'Solte un arquivo para cargalo ou faga clic para seleccionalo.',
      }
    },
    message: {
      yes: 'Sí',
      no: 'Non',
      are_you_sure: 'Está seguro?',
      not_found: 'Non se atopa o elemento',
      about: 'Acerca de',
    },
    navigation: {
      no_results: 'Non se atoparon resultados',
      page_out_of_boundaries: 'A páxina %{page} está fora do límite',
      page_out_from_end: 'Non se pode ir despois da última páxina',
      page_out_from_begin: 'Non se pode ir antes da primera páxina',
      page_range_info: '%{offsetBegin}-%{offsetEnd} de %{total}',
      next: 'Seguinte',
      prev: 'Anterior',
    },
    auth: {
      username: 'Usuario',
      password: 'Contrasinal',
      sign_in: 'Entrar',
      sign_in_error: 'Produciuse un erro na autenticación.',
      logout: 'Pechar sesión',
    },
    notification: {
      updated: 'Elemento actualizado',
      created: 'Elemento creado',
      deleted: 'Elemento eliminado',
      item_doesnt_exist: 'O elemento non existe',
    },
    validation: {
      required: 'Requerido',
      email: 'O formato do email non e válido',
      minLength: 'Debe ter %{min} caracteres como mínimo',
      maxLength: 'Debe ter %{max} caracteres como máximo',
      minValue: 'Mínimo %{min}',
      maxValue: 'Máximo %{max}',
    }
  }
};

export default me;