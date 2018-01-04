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
import React from "react";
import {
  Edit,
  email,
  minLength,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput
} from "admin-on-rest";
import {connect} from "react-redux";


const mapStateToProps = state => ({idUser: state.login.id});

export default connect(mapStateToProps)((props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="login"/>
      <TextInput source="password" validate={[minLength(6)]}/>
      <TextInput source="email" validate={[required, email]}/>
      <TextInput source="name" validate={[required]}/>
      <TextInput source="surname" validate={[required]}/>
      <ReferenceInput source="institution" reference="institution" filter={{director_id: props.idUser}}>
        <SelectInput optionText="name" validate={[required]}/>
      </ReferenceInput>
    </SimpleForm>
  </Edit>
));
