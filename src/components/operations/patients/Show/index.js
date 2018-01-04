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
  Show,
  ReferenceManyField,
  ReferenceField,
  SimpleShowLayout,
  TextField,
  DateField,
  EditButton,
  Datagrid,
  translate
} from "admin-on-rest";
import PropTypes from "prop-types";

class ShowPatient extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dateLocales = this.props.translate("common.dateLocales");

    return <Show {...this.props}>
      <SimpleShowLayout>
        <TextField source="login"/>
        <ReferenceManyField
          label={translate("resources.patient.partialEdits.assignmentDataEdit")}
          reference="assigned-session"
          target="patient"
          perPage={5}
        >
          <Datagrid>
            <ReferenceField
              source="patient"
              reference="patient">
              <TextField source="login"/>
            </ReferenceField>
            <ReferenceField
              source="gamesSessionId"
              reference="games-session">
              <TextField source={"name" + this.props.locale}/>
            </ReferenceField>
            <DateField source="startDate" locales={dateLocales}/>
            <DateField source="endDate" locales={dateLocales}/>
            <EditButton/>
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  }
}

ShowPatient.propTypes = {
  translate: PropTypes.func,
  locale: PropTypes.string
};

export default translate(ShowPatient);
