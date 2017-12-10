import React from 'react';
import {
  Datagrid,
  EditButton,
  ReferenceManyField,
  Show,
  SimpleShowLayout,
  TextField,
  translate
} from 'admin-on-rest';

export default translate(({translate, ...props}) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="login"/>
      <TextField source="email"/>
      <TextField source="name"/>
      <TextField source="surname"/>
      <ReferenceManyField
        label={translate("resources.manager.references.institutionsList")}
        reference="institution"
        target="manager"
      >
        <Datagrid>
          <TextField source="name"/>
          <EditButton/>
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
));
