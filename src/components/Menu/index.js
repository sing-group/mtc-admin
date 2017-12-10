import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import inflection from 'inflection';

import {DashboardMenuItem, MenuItemLink, translate} from 'admin-on-rest';
import Divider from 'material-ui/Divider';

import {getPermissions} from '../../customControllers/PermissionsController';

import LanguageSwitcher from '../LanguageSwitcher';


const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  }
};

const translatedResourceName = (resource, translate) =>
  translate(`resources.${resource}.name`, {
    smart_count: 2,
    _:
      resource.options && resource.options.label
        ? translate(resource.options.label, {
          smart_count: 2,
          _: resource.options.label,
        })
        : inflection.humanize(inflection.pluralize(resource)),
  });

class Menu extends Component {
  render() {
    const {hasDashboard, onMenuTap, resources, logout, translate} = this.props;
    return (
      <div style={styles.main}>
        {hasDashboard && <DashboardMenuItem onClick={onMenuTap}/>}
        {
          resources.map(resource => (
            <MenuItemLink
              key={resource}
              to={`/${resource}`}
              primaryText={translatedResourceName(resource, translate)}
              onClick={onMenuTap}
            />
          ))
        }
        <Divider/>
        <LanguageSwitcher onMenuTap={onMenuTap}/>
        <Divider/>
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
  translate: PropTypes.func
};

Menu.defaultProps = {
  onMenuTap: () => null,
};

const mapStateToProps = state => ({
  resources: getPermissions(state.login.permission) || []
});

export default translate(connect(mapStateToProps)(Menu));