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

import PropTypes from "prop-types";

import {Datagrid, EditButton, List, TextField, translate} from "admin-on-rest";

import FlatButton from "material-ui/FlatButton";
import EditButtonAssignmentIcon from "material-ui/svg-icons/content/create";
import {Link} from "react-router-dom";

import QueryOptions from "../../../../data/endpoints/QueryOptions";

class BaseEditAssignmentButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const queryOptions = new QueryOptions(1, 10, "id", "ASC", {patient: this.props.record.id});

    return <FlatButton
      primary
      label={this.props.translate("resources.patient.partialEdits.assignmentDataView")}
      icon={<EditButtonAssignmentIcon/>}
      containerElement={<Link to={{
        pathname: `/assigned-session`,
        search: queryOptions.buildAORQuery()
      }}/>}
      style={{overflow: "inherit"}}
    />;
  }
}

BaseEditAssignmentButton.propTypes = {
  record: PropTypes.object,
  translate: PropTypes.func
};

BaseEditAssignmentButton.defaultProps = {
  record: PropTypes.object
};

const EditAssignmentButton = translate(BaseEditAssignmentButton);


class PatientList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <List {...this.props}>
      <Datagrid>
        <TextField source="id"/>
        <EditAssignmentButton/>
        <EditButton/>
      </Datagrid>
    </List>;
  }
}

export default translate(PatientList);
