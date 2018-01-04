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
import {
  DateInput,
  Edit,
  ReferenceField,
  TextField,
  required,
  SimpleForm,
  translate
} from "admin-on-rest";
import PropTypes from "prop-types";

class AssignedSessionEdit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dateLocale = this.props.translate("common.dateLocales");

    return <Edit {...this.props} >
      <SimpleForm>
        <TextField source="patient"/>
        <ReferenceField
          source="assignedGamesSessions"
          reference="games-session">
          <TextField source={"name" + this.props.locale}/>
        </ReferenceField>
        <DateInput source="startDate" validate={[required]} options={{locale: dateLocale}}/>
        <DateInput source="endDate" validate={[required]} options={{locale: dateLocale}}/>
      </SimpleForm>
    </Edit>;
  }
}

AssignedSessionEdit.propTypes = {
  translate: PropTypes.func,
  locale: PropTypes.string
};

export default translate(AssignedSessionEdit);
