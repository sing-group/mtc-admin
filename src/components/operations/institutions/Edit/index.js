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
  Edit,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from "admin-on-rest";

class InstitutionEdit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Edit {...this.props}>
      <SimpleForm>
        <TextInput source="name" validate={[required]}/>
        <TextInput source="description" options={{multiLine: true}} validate={[required]}/>
        <TextInput source="address" options={{multiLine: true}} validate={[required]}/>
        <ReferenceInput
          allowEmpty
          source="manager"
          reference="manager"
          validate={[required]}>
          <SelectInput optionText="fullname" validate={[required]}/>
        </ReferenceInput>
      </SimpleForm>
    </Edit>;
  }
}

export default InstitutionEdit;
