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

import {
  Create, minLength,
  required,
  SimpleForm,
  TextInput
} from "admin-on-rest";

import {PATIENT} from "../../../../controllers/AuthController";

import {connect} from "react-redux";

const mapStateToProps = state => ({loginUser: state.login.loginUser});

class CreatePatient extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Create {...this.props}>
      <SimpleForm redirect="list" defaultValue={{role: PATIENT, therapist: this.props.loginUser}}>
        <TextInput source="login" validate={[required]}/>
        <TextInput source="password" validate={[required, minLength(6)]}/>
      </SimpleForm>
    </Create>;
  }
}

CreatePatient.propTypes = {
  loginUser: PropTypes.string
};

export default connect(mapStateToProps)(CreatePatient);
