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
import React, {Component} from "react";
import {connect} from "react-redux"
import PropTypes from "prop-types";
import inflection from "inflection";

import {DashboardMenuItem, MenuItemLink, translate} from "admin-on-rest";
import Divider from "material-ui/Divider";

import SettingsIcon from "material-ui/svg-icons/action/settings";
import { getResources } from "admin-on-rest/lib/reducer"

const styles = {
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
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
              leftIcon={<resource.icon />}
              key={resource.name}
              to={`/${resource.name}`}
              primaryText={translatedResourceName(resource.name, translate)}
              onClick={onMenuTap}
            />
          ))
        }
        <Divider/>
        <MenuItemLink
          to="/configuration"
          primaryText={translate("menu.configurationItem")}
          leftIcon={<SettingsIcon />}
          onClick={onMenuTap}
        />
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
  translate: PropTypes.func,
  resourceEntities: PropTypes.array
};

Menu.defaultProps = {
  onMenuTap: () => null,
};

const mapStateToProps = state => ({
  resources: getResources(state)
});

export default translate(connect(mapStateToProps)(Menu));
