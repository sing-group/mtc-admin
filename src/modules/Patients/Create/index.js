import React from 'react';
import {
  choices,
  Create,
  Datagrid,
  DateField,
  DateInput,
  DisabledInput,
  Edit,
  EditButton,
  email,
  LongTextInput,
  maxLength,
  maxValue,
  minLength,
  minValue,
  number,
  ReferenceInput,
  ReferenceManyField,
  regex,
  required,
  SelectInput,
  ShowButton,
  SimpleForm,
  TextField,
  TextInput
} from 'admin-on-rest';
import {PATIENT} from '../../../customControllers/PermissionsController'
import {connect} from 'react-redux';

const mapStateToProps = state => ({loginUser: state.login.loginUser});
const postDefaultValue = {role: PATIENT};
export default connect(mapStateToProps)((props) => (
  <Create {...props}>
    <SimpleForm redirect="list" defaultValue={{...postDefaultValue, therapist: props.loginUser}}>
      <TextInput source="login" validate={[required]}/>
      <TextInput source="password" validate={[required]}/>
    </SimpleForm>
  </Create>
));