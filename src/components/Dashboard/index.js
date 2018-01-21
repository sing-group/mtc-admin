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
import {Card, CardTitle, CardText} from "material-ui/Card";
import {translate, WithPermission} from "admin-on-rest";
import { Markdown } from 'react-showdown';
import PropTypes from "prop-types";

class DashBoard extends Component {
  render() {
    const {translate} = this.props;

    return (
      <Card>
        <CardTitle title={translate("dashboard.title")}/>
        <WithPermission value="ADMIN">
          <CardText><Markdown markup={translate("dashboard.description.admin")}/></CardText>
        </WithPermission>
        <WithPermission value="MANAGER">
          <CardText><Markdown markup={translate("dashboard.description.manager")}/></CardText>
        </WithPermission>
        <WithPermission value="THERAPIST">
          <CardText><Markdown markup={translate("dashboard.description.therapist")}/></CardText>
        </WithPermission>
      </Card>
    );
  }
}

DashBoard.propTypes = {
  translate: PropTypes.func.isRequired
};

export default translate(DashBoard);