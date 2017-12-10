import React from 'react';
import {DateField, EditButton, ReferenceField, RichTextField, Show, SimpleShowLayout, TextField} from 'admin-on-rest';

export default (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name"/>
      <ReferenceField source="manager" reference="manager" linkType="false">
        <TextField source="name"/>
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);