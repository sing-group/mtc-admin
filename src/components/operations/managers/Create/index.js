import React from 'react';
import {
  Create,
  email,
  minLength,
  required,
  SimpleForm,
  TextInput
} from 'admin-on-rest';

import {MANAGER} from '../../../../controllers/PermissionsController';

export default (props) => (
  <Create {...props}>
    <SimpleForm redirect="list" defaultValue={{role: MANAGER}}>
      <TextInput source="login" validate={[required]}/>
      <TextInput source="password" validate={[required, minLength(6)]}/>
      <TextInput source="email" validate={[required, email]}/>
      <TextInput source="name" validate={[required]}/>
      <TextInput source="surname" validate={[required]}/>
    </SimpleForm>
  </Create>
);