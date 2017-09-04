import messages from '@sing-group/mtc-games/src/i18n/es_ES'
import {parseids} from '../../utils/parseKeys'


 export default {
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
            es : "Español",
            en : "Inglés",
            ga : "Gallego"
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
            addGame : "Añadir juego"
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
        sessions: {
            name: 'Sesión |||| Sesiones',
            fields: {
                title: 'Titulo',
                content: 'Contenido'
            },
        },
        centers: {
            name: 'Centro |||| Centros',
            fields: {
                id : 'Identificador',
                name: 'Nombre',
                description: 'Descripción',
                director_id: 'Director del centro'
            },
        },
        therapists: {
            name: 'Terapeuta |||| Terapeutas',
            fields: {
                id : 'Identificador',
                name: 'Nombre',
                center_id: 'Centro'
            },
        },
        patients: {
            name: 'Paciente |||| Pacientes',
            fields: {
                id : 'Identificador',
                name: 'Nombre',
            },
        },
        directors: {
            name: 'Director |||| Directores',
            fields: {
                id : 'Identificador',
                name: 'Nombre',
            },
            references : {
                centersList : "Centros Asociados"
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
            dashboard: 'Panel de control'
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
        },
    },
};