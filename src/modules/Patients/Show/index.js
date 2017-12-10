import React from 'react';
import {
  Datagrid,
  DateField,
  DisabledInput,
  Edit,
  EditButton,
  ReferenceManyField,
  Show,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  translate
} from 'admin-on-rest';

export default translate(({translate, ...props}) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="login"/>
    </SimpleShowLayout>
  </Show>
));