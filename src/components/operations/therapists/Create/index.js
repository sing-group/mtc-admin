import React from 'react';
import {
  Create,
  email,
  minLength,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from 'admin-on-rest';
import {connect} from 'react-redux';


import {THERAPIST} from '../../../../controllers/AuthController'

const mapStateToProps = state => ({/*userLogin: state.login.userLogin */});

export default connect(mapStateToProps)((props) => (
  <Create {...props}>
    <SimpleForm redirect="list" defaultValue={{role: THERAPIST}}>
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
  </Create>
));