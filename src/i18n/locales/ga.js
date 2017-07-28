module.exports = {
    common: {
        configuration : {
            title : "Opcions",
            languageSelector: 'Linguaxe'
        },
        model : {
            mindValues : {
                car1 : "Retentiva GA",
                car2 : "Mentalidad GA"
            }
        }
    },
    menu: {
        configurationItem : "Opcions"
    },
    resources: {
        posts: {
            name: 'Sesion |||| Sesions',
            fields: {
                title: 'Titulo',
                body: 'Contido'
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