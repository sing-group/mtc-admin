import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import inflection from 'inflection';

import { MenuItemLink , translate} from 'admin-on-rest';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import LanguageSwitcher from '../LanguageSwitcher'

import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import SettingsIcon from 'material-ui/svg-icons/action/settings'

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
};

const translatedResourceName = (resource, translate) =>
    translate(`resources.${resource.name}.name`, {
        smart_count: 2,
        _: resource.options && resource.options.label ?
            translate(resource.options.label, { smart_count: 2, _: resource.options.label }) :
            inflection.humanize(inflection.pluralize(resource.name)),
    });

class Menu extends Component {
    render() {
        const { hasDashboard, onMenuTap, resources, logout, translate } = this.props
        console.log("REDERIZANDO MENU", this.props)
        return (
            <div style={styles.main}>
                {hasDashboard && <MenuItem
                    containerElement={<Link to="/" />}
                    primaryText={translate('aor.page.dashboard')}
                    leftIcon={<DashboardIcon />}
                    onTouchTap={onMenuTap}
                />}
                {resources
                    .filter(r => r.list)
                    .map(resource =>
                        <MenuItemLink
                            key={resource.name}
                            to={`/${resource.name}`}
                            primaryText={translatedResourceName(resource, translate)}
                            leftIcon={<resource.icon />}
                            onTouchTap={onMenuTap}
                        />,
                )
                }
                <Divider />
                <LanguageSwitcher onMenuTap={onMenuTap}/>
                <Divider />
                {logout}
            </div>
        );
    }
}

Menu.propTypes = {
    hasDashboard: PropTypes.bool,
    logout: PropTypes.element,
    onMenuTap: PropTypes.func,
    resources: PropTypes.array,
};

Menu.defaultProps = {
    onMenuTap: () => null,
};

export default translate(Menu);