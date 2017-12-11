import React from 'react';
import {
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  translate
} from 'admin-on-rest';

export default translate(({translate, ...props}) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="login"/>
      <TextField source="name"/>
      <TextField source="surname"/>
      <TextField source="email"/>
      <ReferenceField source="institution" reference="institution" linkType="false">
        <TextField source="name"/>
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
));