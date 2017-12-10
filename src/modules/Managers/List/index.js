import React from 'react';
import {
  ChipField,
  Datagrid,
  EditButton,
  List,
  ReferenceManyField,
  ShowButton,
  SingleFieldList,
  TextField,
  translate
} from 'admin-on-rest';

export default translate(({translate, ...props}) => (
  <List {...props}>
    <Datagrid>
      <TextField source="login"/>
      <TextField source="name"/>
      <TextField source="surname"/>
      <TextField source="email"/>
      <ReferenceManyField
        label={translate("resources.manager.references.institutionsList")}
        reference="institution"
        target="manager"
      >
        <SingleFieldList>
          <ChipField source="name"/>
        </SingleFieldList>
      </ReferenceManyField>
      <EditButton/>
      <ShowButton/>
    </Datagrid>
  </List>
));