import React from 'react';
import {
  Create,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'admin-on-rest';

const validateInstitutionCreation = (values, {translate}) => {
  const errors = {};
  if (values.manager == null)
    errors.manager = [translate("aor.validation.required")];
  return errors
};

export default (props) => (
  <Create {...props}>
    <SimpleForm validate={validateInstitutionCreation} redirect="list">
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
  </Create>
);