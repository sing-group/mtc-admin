import messages from '@sing-group/mtc-games/src/i18n/es_ES'
import {parseids} from '../../utils/parseKeys'


const me = {
    common: {
        configuration : {
            title : "Configuración",
            languageSelector: 'Idioma'
        },
         model : {
            games : Object.keys(messages).reduce( (accum,key) => {
                accum[parseids(key)] = messages[key]
                return accum
            }, {} )
        },
        languages : {
            es_ES : "Español",
            en_US : "Inglés",
            gl_ES : "Gallego"
        },
        multilanguagePickerTitle : 'Idiomas',
        multilanguagePicker : 'Introduce valor para "%{idioma}"',
        invalidCredentials : 'Usuario no válido'
    },
    others:{
        accept : "Aceptar",
    },
    menu: {
        configurationItem : "Configuración"
    },
    session:{
        create: {
            addGame : "Añadir juego",
            endConfiguration: "Finalizar configuración"
        }
    },
    game : {
        configurer : {
            toolbar : {
                options : "Opciones"
            }
        },
        picker : {
            title : "Selecciona un juego",
            addGames : "Añadir juegos"
        }
    },
    resources: {
        session: {
            name: 'Sesión |||| Sesiones',
            fields: {
                title: 'Titulo',
                content: 'Contenido'
            },
        },
        institution: {
            name: 'Centro |||| Centros',
            fields: {
                id : 'Identificador',
                name: 'Nombre',
                address: 'Dirección',
                description: 'Descripción',
                manager: 'Director del centro'
            },
        },
        therapist: {
            name: 'Terapeuta |||| Terapeutas',
            fields: {
                id : 'Identificador',
                name: 'Nombre',
                institution: 'Centro'
            },
        },
        patient: {
            name: 'Paciente |||| Pacientes',

            fields: {
                id : 'Login',
                password : 'Contraseña',
                assignedSession : 'Sesiones Asignadas'
            },
        },
        assignedSession: {
            name: 'Asignación |||| Asignaciones',

            fields: {
                id : 'Identificador',
                session : 'Sesión',
                assignmentDate : 'Fecha de asignación',
                startDate : 'Comienzo de sesión',
                endDate : 'Finalización de sesión',
                gamesSessionId : 'Sesión'
            },
        },
        manager: {
            name: 'Director |||| Directores',
            fields: {
                name: 'Nombre',
                surname: 'Apellidos',
                password: 'Contraseña',
                login: 'Login',
                email: 'Correo electrónico'
            },
            references : {
                institutionsList : "Centros Asociados"
            }
        }

    },
    aor: {
        action: {
            delete: 'Eliminar',
            show: 'Mostrar',
            list: 'Listar',
            save: 'Guardar',
            cancel: 'Cancelar',
            create: 'Crear',
            edit: 'Editar',
            refresh: 'Actualizar',
            add_filter: 'Añadir filtro',
            remove_filter: 'Eliminar filtro',
            back: 'Atras'
        },
        boolean: {
            true: 'Sí',
            false: 'No',
        },
        page: {
            list: 'Listar %{name}',
            edit: 'Editar %{name}',
            show: 'Datos %{name}',
            create: 'Crear %{name}',
            delete: 'Eliminar %{name}',
            dashboard: 'Panel de control',
            not_found: 'Página no encontrada'
        },
        input: {
            image: {
                upload_several: 'Suelte algunos archivos para cargar o haga clic para seleccionar uno.',
                upload_single: 'Suelte un archivo para cargarlo o haga clic para seleccionarlo.',
            },
        },
        message: {
            yes: 'Sí',
            no: 'No',
            are_you_sure: '¿Estás seguro?',
            not_found: 'No se encuentra el elemento',
            about: 'Acerca de',

        },
        navigation: {
            no_results: 'No se encontraron resultados',
            page_out_of_boundaries: 'La página %{page} está fuera del limite',
            page_out_from_end: 'No se puede ir después de la última página',
            page_out_from_begin: 'No se puede ir antes de la página 1',
            page_range_info: '%{offsetBegin}-%{offsetEnd} de %{total}',
            next: 'Siguiente',
            prev: 'Anterior',
        },
        auth: {
            username: 'Usuario',
            password: 'Contraseña',
            sign_in: 'Ingresar',
            sign_in_error: 'Se ha producido un error en la autenticación.',
            logout: 'Cerrar sesión',
        },
        notification: {
            updated: 'Elemento actualizado',
            created: 'Elemento creado',
            deleted: 'Elemento eliminado',
            item_doesnt_exist: 'El elemento no existe',
        },
        validation: {
            required: 'Requerido',
            email: 'Formato no válido',
            minLength: 'Debe tener %{min} caracteres como mínimo',
            maxLength: 'Debe tener %{max} caracteres como máximo',
            minValue: 'Mínimo %{min}',
            maxValue: 'Máximo %{max}',
        },
    },
};
console.log(me)
export default me