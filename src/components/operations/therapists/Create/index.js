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
  Create,
  email,
  minLength,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from "admin-on-rest";

class TherapistCreate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Create {...this.props}>
      <SimpleForm redirect="list">
        <TextInput source="login" validate={[required]}/>
        <TextInput source="password" validate={[required, minLength(6)]}/>
        <TextInput source="email" validate={[required, email]}/>
        <TextInput source="name" validate={[required]}/>
        <TextInput source="surname" validate={[required]}/>
        <ReferenceInput
          allowEmpty
          source="institution"
          reference="institution"
          validate={[required]}
        >
          <SelectInput optionText="name" validate={[required]}/>
        </ReferenceInput>
      </SimpleForm>
    </Create>;
  }
}

export default TherapistCreate;
