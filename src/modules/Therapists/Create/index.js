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
  SimpleForm,
  TextField,
  TextInput
} from 'admin-on-rest';
import {connect} from 'react-redux';


import {THERAPIST} from '../../../customControllers/PermissionsController'

const mapStateToProps = state => ({/*userLogin: state.login.userLogin */});
const postDefaultValue = {role: THERAPIST};
export default connect(mapStateToProps)((props) => (
  <Create {...props}>
    <SimpleForm redirect="list" defaultValue={postDefaultValue}>
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
        /*filter={{ manager: props.userLogin }} ESTE FILTRO NO HACE FALTA SI LOS QUE RETORNAN SON YA LOS PERMITIDOS*/>
        <SelectInput optionText="name" validate={[required]}/>
      </ReferenceInput>
    </SimpleForm>
  </Create>
));