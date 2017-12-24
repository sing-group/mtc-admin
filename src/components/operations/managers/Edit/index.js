import React from 'react';
import {
  Edit,
  email,
  minLength,
  required,
  SimpleForm,
  TextInput,
  TextField
} from 'admin-on-rest';

export default (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="login"/>
      <TextInput source="password" validate={[minLength(6)]}/>
      <TextInput source="email" validate={[required, email]}/>
      <TextInput source="name" validate={[required]}/>
      <TextInput source="surname" validate={[required]}/>
    </SimpleForm>
  </Edit>
);