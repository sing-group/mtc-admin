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
        multilanguagePicker : 'Introduce o valor para "%{idioma}"'
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
        posts: {
            name: 'Sesión |||| Sesións',
            fields: {
                title: 'Titulo',
                content: 'Contido'
            },
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
            edit: '%{name} #%{id}',
            show: '%{name} #%{id}',
            create: 'Engadir %{name}',
            delete: 'Eliminar %{name} #%{id}',
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