import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {
  Create, minLength,
  required,
  SimpleForm,
  TextInput
} from 'admin-on-rest';

import {PATIENT} from '../../../customControllers/PermissionsController';

import {connect} from 'react-redux';

const mapStateToProps = state => ({loginUser: state.login.loginUser});

class CreatePatient extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("PATIENT_PROPS", this.props);

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