import React from 'react';
import {ReferenceField, Show, SimpleShowLayout, TextField} from 'admin-on-rest';

export default (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name"/>
      <TextField source="description"/>
      <TextField source="address"/>
      <ReferenceField source="manager" reference="manager" linkType="false">
        <TextField source="fullname"/>
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);