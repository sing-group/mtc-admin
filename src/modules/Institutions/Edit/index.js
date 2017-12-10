import React from 'react';
import {
  Edit,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from 'admin-on-rest';


export default (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" validate={[required]}/>
      <TextInput source="description" options={{multiLine: true}} validate={[required]}/>
      <TextInput source="address" options={{multiLine: true}} validate={[required]}/>
      <ReferenceInput
        allowEmpty
        source="manager"
        reference="manager"
        validate={[required]}>
        <SelectInput optionText="fullname" validate={[required]}/>
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);