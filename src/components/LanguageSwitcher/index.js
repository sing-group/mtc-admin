import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLocale as changeLocaleAction, translate, MenuItemLink } from 'admin-on-rest';

import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import PropTypes from 'prop-types';

class LanguageSwitcher extends Component {

    changeLang(lang) {
        this.props.changeLocale(lang) //TODO: check dont work
        this.forceUpdate()
    }

    render() {
        const { translate , onMenuTap} = this.props;
        return (
            <MenuItem
                primaryText={translate('common.configuration.languageSelector')}
                rightIcon={<ArrowDropRight />}
                leftIcon={<SettingsIcon />}
                menuItems={[
                    <MenuItem  primaryText="English" onClick={() => {
                        this.changeLang('en_US')
                    }} />,
                    <MenuItem  primaryText="Galego" onClick={() => {
                        this.changeLang('gl_ES')
                    }} />,
                    <MenuItem primaryText="Español" onClick={() => {
                        this.changeLang('es_ES')
                    }} />,
                ]}
            />
        );
    }
}

LanguageSwitcher.contextTypes = {
    translate: PropTypes.func,
};

export default connect(undefined, { changeLocale: changeLocaleAction })(translate(LanguageSwitcher));