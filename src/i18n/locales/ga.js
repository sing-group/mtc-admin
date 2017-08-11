import messages from '@sing-group/mtc-games/src/i18n/gl_ES'
import {parseids} from '../../utils/parseKeys'
 export default {
    common: {
        configuration : {
            title : "Opcions",
            languageSelector: 'Linguaxe'
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
            ga : "Galego"
        },
        multilanguagePicker : 'Introduce o valor para "%{idioma}"',
        invalidCredentials : 'Usuario non válido'
    },
    others:{
        accept : "Aceptar",
    },
    menu: {
        configurationItem : "Opcions"
    },
    session:{
        create: {
            addGame : "Engadir xogo"
        }
    },
    game : {
        configurer : {
            toolbar : {
                options : "Opcións"
            }
        },
        picker : {
            title : "Escolla un xogo",
            addGames : "Engadir xogos"
        }
    },
    resources: {
        sessions: {
            name: 'Sesión |||| Sesións',
            fields: {
                id : 'Identificador',
                title: 'Titulo',
                content: 'Contido'
            },
        },
        centers: {
            name: 'Centro |||| Centros',
            fields: {
                id : 'Identificador',
                name: 'Nome',
                description: 'Descricion',
                director_id: 'Director do centro'
            },
        },
        therapists: {
            name: 'Terapeuta |||| Terapeutas',
            fields: {
                id : 'Identificador',
                name: 'Nome',
                center_id: 'Centro'
            },
        },
        patients: {
            name: 'Paciente |||| Pacientes',
            fields: {
                id : 'Identificador',
                name: 'Nome',
            },
        },
        directors: {
            name: 'Director |||| Directores',
            fields: {
                id : 'Identificador',
                name: 'Nome',
            },
            references : {
                centersList : "Centros Asociados"
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
            no: 'Non',
            are_you_sure: '¿Está seguro?',
            about: 'Acerca de',
        },
        navigation: {
            no_results: 'Non se atoparon resultados',
            page_out_of_boundaries: 'A páxina %{page} está fora do limite',
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
            logout: 'Cerrar sesión',
        },
        notification: {
            updated: 'Elemento actualizado',
            created: 'Elemento creado',
            deleted: 'Elemento eliminado',
            item_doesnt_exist: 'O elemento non existe',
        },
        validation: {
            required: 'Requerido',
        },
    },
};